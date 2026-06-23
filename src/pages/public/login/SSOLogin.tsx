// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
// import { Form, Input, Button, Card, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// Importing React Icons for form visual inputs
// import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import api from '../../../Utils/ApiCalls/Api';
import { message } from 'antd';
// import axios from 'axios';

export default function SSOLogin() {

  // const navigate = useNavigate();
  // const navigate = Navigate();

  const exchangeSession = async () => {

      const params = new URLSearchParams(window.location.search);

      // console.log(window.location.pathname);
      // console.log(params);

      const sessionId = params.get("sessionId");

      console.log("Session ID:", sessionId);

      if (!sessionId) {
        console.error("Session ID not found");
        return;
      } else{
        localStorage.clear();
        // message.info("Exchanging session, please wait...");
      }

      try {

        const response = await api.get(`auth/session/exchange?sessionId=${sessionId}`);

        // console.log("Exchange Response:", response.data);

        const data = response.data.data;

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        message.success("Session exchange successful!");

        console.log("Access Token:", data);

      //   console.log("Login Success");

      try {
          // Use standard 'axios' here to bypass request interceptor synchronization delays.
          // Prepend '/api' to cleanly hit your Vite dev server proxy target
          const profileResponse = await api.get('/auth/profile', {
            headers: { 
              'Authorization': `Bearer ${data.accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          const profileResult = profileResponse.data;

          // Extract and assign permissions directly from the expected profile JSON data node
          if (profileResult && profileResult.data && profileResult.data.role) {
            localStorage.setItem('role', profileResult.data.role);

            // Optional: Store other useful profile parameters for your Layouts/Header
            localStorage.setItem('userName', profileResult.data.name);
            localStorage.setItem('userId', profileResult.data.userId);

            // window.location.href = profileResult.data.redirectUrl + `?token=${encodeURIComponent(data.accessToken)}`;

            window.location.href = "/home/profile";

            //  return <Navigate to='/home' />;

          } else {
            console.warn('Profile fetched, but no user role was found in the payload structure.');
          }

        } catch (profileError: any) {
          // Suppress complete failure: Allow application entry but warn about missing state roles
          console.error('Chained profile execution failed:', profileError);
          message.warning('Logged in successfully, but failed to synchronize your user profile role.');
        }

        // window.location.href = "/home";

        // navigate('/home');

      } catch (error) {
        console.error("Exchange Failed", error);
        window.location.href = "http://localhost:5173/"; // Redirect to login on failure
      }
    };

  useEffect(() => {
    exchangeSession();
  }, []);

  return (
    <div>
      Authenticating...
    </div>
  );
}
