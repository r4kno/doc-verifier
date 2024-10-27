from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import pytesseract
from pytesseract import Output
import numpy as np
import os
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

app = Flask(__name__)
CORS(app)

# Set the path to your original PNG file
ORIGINAL_FILE_PATH = "./original.jpg"

def get_font_info(ocr_data):
    font_info = []
    for i, text in enumerate(ocr_data['text']):
        if text.strip() != "":  # Ignore empty text
            font_size = ocr_data['height'][i]
            font_info.append((text, font_size))
    return font_info

def compare_fonts(original_font_info, test_font_info):
    alterations = []
    for orig, test in zip(original_font_info, test_font_info):
        if orig[0] != test[0] or orig[1] != test[1]:  # Check if text or size differs
            alterations.append({
                'original_text': orig[0],
                'original_size': orig[1],
                'test_text': test[0],
                'test_size': test[1]
            })
    return alterations

def process_images(original_image, test_file_data):
    # Convert test file data to numpy array
    test_np = np.frombuffer(test_file_data, np.uint8)
    
    # Decode the test image
    test_image = cv2.imdecode(test_np, cv2.IMREAD_COLOR)
    
    # Convert to grayscale
    original_gray = cv2.cvtColor(original_image, cv2.COLOR_BGR2GRAY)
    test_gray = cv2.cvtColor(test_image, cv2.COLOR_BGR2GRAY)
    
    # Perform OCR
    original_data = pytesseract.image_to_data(original_gray, output_type=Output.DICT)
    test_data = pytesseract.image_to_data(test_gray, output_type=Output.DICT)
    
    # Extract font info
    original_font_info = get_font_info(original_data)
    test_font_info = get_font_info(test_data)
    
    # Compare and get alterations
    alterations = compare_fonts(original_font_info, test_font_info)
    
    return alterations

@app.route('/verify-document', methods=['POST'])
def verify_document():
    try:
        if 'test' not in request.files:
            return jsonify({'error': 'Missing test file'}), 400
        
        # Read the original image file
        if not os.path.exists(ORIGINAL_FILE_PATH):
            return jsonify({'error': 'Original file not found'}), 404
            
        original_image = cv2.imread(ORIGINAL_FILE_PATH)
        if original_image is None:
            return jsonify({'error': 'Failed to load original image'}), 500
        
        test_file = request.files['test']
        test_data = test_file.read()
        
        # Process images
        alterations = process_images(original_image, test_data)
        
        # Prepare response
        if alterations:
            result = {
                'status': 'ALTERATIONS_DETECTED',
                'message': f'Found alterations in the document',
            }
        else:
            result = {
                'status': 'NO_ALTERATIONS',
                'alterations': [],
                'message': 'Document appears to be genuine. No alterations detected.'
            }
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error: {str(e)}")  # Add this for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)