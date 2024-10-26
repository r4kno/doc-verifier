import React, { useState } from "react";
import { setLogin, setAuthorityLogin } from "state";
import { 
  Box, 
  Button, 
  TextField, 
  useTheme, 
  Typography 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";

// Validation schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const AuthoritiesForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Add selector to monitor auth state
  const authState = useSelector((state) => state.auth);

  const login = async (values, onSubmitProps) => {
    try {
      console.log("Attempting login with values:", values);

      const loggedInResponse = await fetch("http://localhost:3001/auth/authorityLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("Response status:", loggedInResponse.status);
      
      if (!loggedInResponse.ok) {
        throw new Error("Invalid Email or Password");
      }

      const loggedIn = await loggedInResponse.json();
      console.log("Login response data:", loggedIn);
      
      onSubmitProps.resetForm();

      if (loggedIn) {
        // Log the data being dispatched
        console.log("Dispatching authority login with data:", {
          authority: loggedIn.authority,
          authorityToken: loggedIn.token
        });

        dispatch(
          setAuthorityLogin({
            authority: loggedIn.authority,
            authorityToken: loggedIn.token,
          })
        );

        // Log the updated state after dispatch
        console.log("Auth state after dispatch:", authState);
        
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      window.alert(error.message);
      onSubmitProps.setSubmitting(false);
    }
  };

  // Log the current auth state on each render
  console.log("Current auth state:", authState);

  return (
    <Formik
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
      onSubmit={login}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            margin="normal"
          />
          
          {/* Error message display */}
          {Object.keys(errors).length > 0 && (
            <Typography color="error" sx={{ mt: 2 }}>
              Please correct the errors above
            </Typography>
          )}
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
              <Typography variant="caption">
                Form Values: {JSON.stringify(values, null, 2)}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Formik>
  );
};

export default AuthoritiesForm;