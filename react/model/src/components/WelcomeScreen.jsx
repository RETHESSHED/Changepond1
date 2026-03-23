import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const hasSpoken = useRef(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Prevent double voice in React StrictMode
    if (hasSpoken.current) return;
    hasSpoken.current = true;

    const role = user.role?.toLowerCase();

    const userName =
      user.studentname ||
      user.trainername ||
      user.adminname ||
      user.name ||
      "User";

    // Cancel previous speech
    speechSynthesis.cancel();

    const speakWelcome = () => {
      const speech = new SpeechSynthesisUtterance(
        `Welcome ${userName}`
      );

      //  Sweet female voice settings
      speech.rate = 0.85;
      speech.pitch = 1.2;
      speech.volume = 1;

      const voices = speechSynthesis.getVoices();

      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("google uk english female")
      );

      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      // Redirect after speech finishes
      speech.onend = () => {
        if (role === "admin") navigate("/admin");
        else if (role === "trainer") navigate("/trainer");
        else if (role === "student") navigate("/student");
        else navigate("/login");
      };

      speechSynthesis.speak(speech);
    };

    // Some browsers load voices late
    if (speechSynthesis.getVoices().length > 0) {
      speakWelcome();
    } else {
      speechSynthesis.onvoiceschanged = speakWelcome;
    }

  }, [navigate, user]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Welcome{" "}
          {user?.studentname ||
            user?.trainername ||
            user?.adminname ||
            user?.name}
        </h1>

        <p style={styles.subtitle}>
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #1f1f1f, #343a40)",
  },
  card: {
    padding: "60px",
    borderRadius: "15px",
    background: "#ffffff",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#dc3545",
  },
  subtitle: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#555",
  },
};

export default WelcomeScreen;
