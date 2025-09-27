import React, { useEffect, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Shield, Key } from "lucide-react"; // Added Key icon
import { useAuth } from "../../context/AuthContext";
import { InputField } from "./InputField";
import { RoleSelector } from "./RoleSelector";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
  name: string;
  role: "admin" | "employee";
  otp?: string;
  newPassword?: string;
};

export const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isForgotFlow, setIsForgotFlow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    role: "employee",
    otp: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);



  const {
    login,
    register,
    sendRegisterOTP,
    verifyRegisterOTP,
    sendForgotOTP,
    verifyForgotOTP,
  } = useAuth();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrors([]);

  //   const newErrors: string[] = [];
  //   if (!formData.email) newErrors.push("Email is required");
  //   if (!isForgotFlow && !isLogin && !formData.name) newErrors.push("Name is required");
  //   if (!isOtpSent && !isForgotFlow && formData.password.length < 6)
  //     newErrors.push("Password must be at least 6 characters");

  //   if (newErrors.length > 0) {
  //     setErrors(newErrors);
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     if (isLogin) {
  //       // LOGIN
  //       if (isForgotFlow) {
  //         // Forgot password flow
  //         if (!isOtpSent) {
  //           const sent = await sendForgotOTP(formData.email);
  //           if (sent) setIsOtpSent(true);
  //           else setErrors(["Failed to send OTP"]);
  //         } else if (formData.otp && formData.newPassword) {
  //           const verified = await verifyForgotOTP(
  //             formData.email,
  //             formData.otp,
  //             formData.newPassword
  //           );
  //           if (verified) {
  //             setIsForgotFlow(false);
  //             setIsOtpSent(false);
  //             setFormData({ ...formData, otp: "", newPassword: "", password: "" });
  //             setErrors(["Password changed successfully. You can login now."]);
  //           } else {
  //             setErrors(["OTP verification failed"]);
  //           }
  //         }
  //       } else {
  //         // Normal login
  //         const success = await login(formData.email, formData.password);
  //         if (!success) setErrors(["Invalid credentials."]);
  //       }
  //     } else {
  //       // REGISTER
  //       if (!isOtpSent) {
  //         const sent = await sendRegisterOTP(formData.email);
  //         if (sent) setIsOtpSent(true);
  //         else setErrors(["Failed to send OTP"]);
  //       } else if (formData.otp) {
  //         const verified = await verifyRegisterOTP(formData.email, formData.otp);
  //         if (verified) {
  //           const success = await register(
  //             formData.name,
  //             formData.email,
  //             formData.password,
  //             formData.role
  //           );
  //           if (!success) setErrors(["Registration failed."]);
  //         } else {
  //           // setErrors(["OTP verification failed"]);
            
  //         }
  //       }
  //     }
  //   } catch (err: any) {
  //     setErrors([err?.response?.data?.message || "Something went wrong."]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors([]);

  const newErrors: string[] = [];
  if (!formData.email) newErrors.push("Email is required");
  if (!isForgotFlow && !isLogin && !formData.name) newErrors.push("Name is required");
  if (!isOtpSent && !isForgotFlow && formData.password.length < 6)
    newErrors.push("Password must be at least 6 characters");

  if (newErrors.length > 0) {
    setErrors(newErrors);
    newErrors.forEach(err => toast.error(err));
    setIsLoading(false);
    return;
  }

  try {
    if (isLogin) {
      if (isForgotFlow) {
        if (!isOtpSent) {
          const sent = await sendForgotOTP(formData.email);
          if (sent) {
            setIsOtpSent(true);
            toast.success("OTP sent to your email!");
          } else toast.error("Failed to send OTP");
        } else if (formData.otp && formData.newPassword) {
          const verified = await verifyForgotOTP(formData.email, formData.otp, formData.newPassword);
          if (verified) {
            setIsForgotFlow(false);
            setIsOtpSent(false);
            setFormData({ ...formData, otp: "", newPassword: "", password: "" });
            toast.success("Password changed successfully. You can login now.");
          } else toast.error("OTP verification failed");
        }
      } else {
        const success = await login(formData.email, formData.password);
        if (success) toast.success("Logged in successfully!");
        else toast.error("Invalid credentials");
      }
    } else {
      if (!isOtpSent) {
        const sent = await sendRegisterOTP(formData.email);
        if (sent) {
          setIsOtpSent(true);
          toast.success("OTP sent to your email!");
        } else toast.error("Failed to send OTP");
      } else if (formData.otp) {
        const verified = await verifyRegisterOTP(formData.email, formData.otp);
        if (verified) {
          const success = await register(formData.name, formData.email, formData.password, formData.role);
          if (success) toast.success("Registered successfully!");
          else toast.error("Registration failed");
        } else toast.error("OTP verification failed");
      }
    }
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong.";
    setErrors([message]);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border p-8 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Knowledge Base</h1>
            <p className="text-gray-700 dark:text-gray-300">
              {isLogin
                ? isForgotFlow
                  ? "Forgot password flow. Enter email to receive OTP."
                  : "Welcome back! Please sign in."
                : "Create your account to get started."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && !isOtpSent && (
              <InputField
                label="Full Name"
                value={formData.name}
                onChange={(val) => setFormData({ ...formData, name: val })}
                icon={<User className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                placeholder="Enter your full name"
              />
            )}

            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(val) => setFormData({ ...formData, email: val })}
              icon={<Mail className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
              placeholder="Enter your email"
              disabled={isOtpSent && !isForgotFlow}
            />

            {!isOtpSent && !isForgotFlow && (
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(val) => setFormData({ ...formData, password: val })}
                icon={<Lock className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                placeholder="Enter your password"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-100"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />
            )}

            {isOtpSent && (
              <InputField
                label="Enter OTP"
                type="text"
                value={formData.otp || ""}
                onChange={(val) => setFormData({ ...formData, otp: val })}
                placeholder="Enter OTP sent to email"
                icon={<Key className="w-6 h-6   text-gray-600 dark:text-gray-300" />} // OTP icon
              />
            )}

            {isForgotFlow && isOtpSent && (
              <InputField
                label="New Password"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword || ""}
                onChange={(val) => setFormData({ ...formData, newPassword: val })}
                icon={<Lock className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
                placeholder="Enter new password"
              />
            )}

            {!isLogin && !isOtpSent && (
              <RoleSelector role={formData.role} onChange={(role) => setFormData({ ...formData, role })} />
            )}

            {errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-4 animate-fade-in">
                {errors.map((err, i) => (
                  <p key={i} className="text-sm text-red-600 dark:text-red-400">{err}</p>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : isOtpSent
                ? "Verify OTP"
                : isLogin
                ? isForgotFlow
                  ? "Send OTP"
                  : "Sign In"
                : "Create Account"}
            </button>

            {isLogin && !isForgotFlow && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsForgotFlow(true)}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsForgotFlow(false);
                  setIsOtpSent(false);
                  setErrors([]);
                  setFormData({ email: "", password: "", name: "", role: "employee", otp: "", newPassword: "" });
                }}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
