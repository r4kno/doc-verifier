import os
import cv2
import pytesseract
import easyocr
import spacy
import nltk
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import Dict, Any

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS if needed
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load models and other dependencies
nlp = spacy.load("en_core_web_sm")
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
easyocr_reader = easyocr.Reader(['en'], gpu=False)

# OCR Function using pytesseract
def extract_text_with_pytesseract(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)
    return text

# OCR Function using easyOCR
def extract_text_with_easyocr(image_path):
    results = easyocr_reader.readtext(image_path)
    full_text = ' '.join([result[1] for result in results])
    return full_text

# Preprocess text
def preprocess_text(text):
    return text.lower()

# Field Extraction
def extract_fields(text):
    name, dob = "Not Found", "Not Found"
    
    name_match = re.search(r'(?:i certify that|this is to certify that|is to certify that)\s*([a-zA-Z]+\s[a-zA-Z]+)', text)
    if name_match:
        name = name_match.group(1).strip()
    
    dob_match = re.search(r'\b(\d{2}[-/]\d{2}[-/]\d{4})\b', text)
    if dob_match:
        dob = dob_match.group()
    
    return name, dob

# Analyze text with Spacy
def analyze_with_spacy(text: str) -> Dict[str, Any]:
    doc = nlp(text)
    entities = {'PERSON': [], 'ORG': [], 'DATE': [], 'GPE': [], 'CARDINAL': []}
    
    for ent in doc.ents:
        if ent.label_ in entities:
            entities[ent.label_].append(ent.text)
    
    return entities

# Analyze text with NLTK
def analyze_with_nltk(text: str) -> Dict[str, Any]:
    tokens = nltk.word_tokenize(text)
    tagged = nltk.pos_tag(tokens)
    entities = nltk.ne_chunk(tagged)
    
    named_entities = [(chunk.label(), ' '.join(c[0] for c in chunk)) for chunk in entities if hasattr(chunk, 'label')]
    
    return {'named_entities': named_entities, 'pos_tags': tagged}

# Determine document type
def determine_document_type(text: str, entities: Dict[str, Any]) -> str:
    text_lower = text.lower()
    
    if any(word in text_lower for word in ['certificate', 'certify', 'certification']):
        return 'certificate'
    elif any(word in text_lower for word in ['transcript', 'grade', 'semester']):
        return 'academic_transcript'
    elif any(word in text_lower for word in ['identity', 'id', 'identification']):
        return 'identity_document'
    elif len(entities.get('ORG', [])) > 0 and any(word in text_lower for word in ['experience', 'employment']):
        return 'experience_certificate'
    else:
        return 'unknown'

# Endpoint for file upload and document analysis
@app.route('/analyze', methods=['POST'])
def analyze_document():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Save the uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    try:
        # Perform analysis
        pytesseract_text = extract_text_with_pytesseract(file_path)
        easyocr_text = extract_text_with_easyocr(file_path)
        combined_text = pytesseract_text + " " + easyocr_text
        
        # Preprocess and extract fields
        processed_text = preprocess_text(combined_text)
        name, dob = extract_fields(processed_text)
        
        # Analyze text
        spacy_analysis = analyze_with_spacy(combined_text)
        nltk_analysis = analyze_with_nltk(combined_text)
        document_type = determine_document_type(combined_text, spacy_analysis)
        
        # Prepare response
        response = {
            'original_text': combined_text,
            'processed_text': processed_text,
            'extracted_name': name,
            'extracted_dob': dob,
            'spacy_entities': spacy_analysis,
            'nltk_analysis': nltk_analysis,
            'document_type': document_type
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Cleanup uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)

# Run the server
if __name__ == '__main__':
    app.run(port=3002, debug=True)
