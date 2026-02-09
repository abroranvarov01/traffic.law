// src/components/Consultation/Snackbar.jsx

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiX } from "react-icons/fi"; // Ikonkalar
import "./SnackbarStyle.scss"; // Yangi SCSS faylini import qilamiz

const Snackbar = ({ open, message, severity, onClose }) => {
  // Snackbar avtomatik yopilishi uchun (3.5 soniya)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  const Icon = severity === "success" ? FiCheckCircle : FiAlertTriangle;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`snackbar-wrapper ${severity}`}
          initial={{ opacity: 0, x: 100 }} // O'ngdan chiqish
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="snackbar-icon">
            <Icon size={24} />
          </div>
          <p className="snackbar-message">{message}</p>
          <button className="snackbar-close" onClick={onClose}>
            <FiX size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
