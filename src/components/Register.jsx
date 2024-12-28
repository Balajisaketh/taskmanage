// import { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn, Loader2 } from 'lucide-react';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [apiError, setApiError] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//     setApiError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (!isLogin && formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegistration = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:3000/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       // Registration successful
//       alert('Registration successful! Please login.');
//       setIsLogin(true);
//       setFormData({ email: '', password: '' });
//     } catch (error) {
//       setApiError(error.message || 'Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
      
//     });

//     const data = await response.json();

//     if (data.token) {
//       localStorage.setItem("authToken", data.token); // Store the JWT token in localStorage
//       setError("");
//       console.log("Login successful!");
//       // Redirect to a protected page or dashboard
//     } else {
//       setError(data.error || "Something went wrong");
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       if (isLogin) {
//         await handleLogin();
//       } else {
//         await handleRegistration();
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 p-4 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -inset-[10px] opacity-50">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//           <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//         </div>
//       </div>

//       {/* Glass Card Container */}
//       <div className="w-full max-w-md relative">
//         <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
//           {/* Header */}
//           <div className="text-center space-y-2">
//             <h1 className="text-3xl font-bold text-white">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </h1>
//             <p className="text-gray-200">
//               {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
//             </p>
//           </div>

//           {/* API Error Message */}
//           {apiError && (
//             <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
//               {apiError}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-200">Email</label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                   className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg 
//                     focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
//                     placeholder-gray-400 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-300 text-sm">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-200">Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                   className="w-full pl-10 pr-12 py-2 bg-white/10 border border-white/20 text-white rounded-lg 
//                     focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
//                     placeholder-gray-400 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
//                   placeholder={isLogin ? 'Enter password' : 'Create password'}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   disabled={isLoading}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
//                 >
//                   {showPassword ? 
//                     <EyeOff className="h-5 w-5" /> : 
//                     <Eye className="h-5 w-5" />
//                   }
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-300 text-sm">{errors.password}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white py-3 px-4 rounded-lg
//                 focus:ring-4 focus:ring-blue-500/50 transition-all backdrop-blur-sm
//                 flex items-center justify-center space-x-2 group disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               ) : isLogin ? (
//                 <>
//                   <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
//                   <span>Sign In</span>
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
//                   <span>Create Account</span>
//                 </>
//               )}
//             </button>

//             {/* Toggle Form Type */}
//             <div className="text-center text-sm">
//               <p className="text-gray-200">
//                 {isLogin ? "Don't have an account?" : "Already have an account?"}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setIsLogin(!isLogin);
//                     setFormData({ email: '', password: '' });
//                     setErrors({});
//                     setApiError('');
//                   }}
//                   disabled={isLoading}
//                   className="ml-2 text-blue-400 hover:text-blue-300 font-medium focus:outline-none hover:underline transition-colors disabled:opacity-50"
//                 >
//                   {isLogin ? 'Sign up' : 'Sign in'}
//                 </button>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add the required animation CSS
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes blob {
//     0% { transform: translate(0px, 0px) scale(1); }
//     33% { transform: translate(30px, -50px) scale(1.1); }
//     66% { transform: translate(-20px, 20px) scale(0.9); }
//     100% { transform: translate(0px, 0px) scale(1); }
//   }
//   .animate-blob {
//     animation: blob 7s infinite;
//   }
//   .animation-delay-2000 {
//     animation-delay: 2s;
//   }
//   .animation-delay-4000 {
//     animation-delay: 4s;
//   }
// `;
// document.head.appendChild(style);swswwwww

// export default AuthForm;
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loggeduser } from '../redux/taskSlice';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // default to login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const disp=useDispatch()
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      

      // Registration successful
      alert('Registration successful! Please login.');
      setIsLogin(true);
      setFormData({ email: '', password: '' });
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent login if the form is invalid

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email, // Use email for login
          password: formData.password,
        }),
      });


      const data = await response.json();

      if (data.token) {
        console.log("i m toke",data.token)

        localStorage.setItem("authToken", data.token);
        disp(loggeduser(formData.email))
        navigate("/dashboard");
         // Store the JWT token in localStorage
        setApiError('');
        console.log("Login successful!");
        // Redirect to a protected page or dashboard
      } else {
        setApiError(data.error || "Something went wrong");
      }
    } catch (error) {
      setApiError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        await handleLogin(e);
      } else {
        await handleRegistration();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Glass Card Container */}
      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-200">
              {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
            </p>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    placeholder-gray-400 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-10 pr-12 py-2 bg-white/10 border border-white/20 text-white rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    placeholder-gray-400 backdrop-blur-sm hover:bg-white/20 disabled:opacity-50"
                  placeholder={isLogin ? 'Enter password' : 'Create password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-3 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5" /> : 
                    <Eye className="h-5 w-5" />
                  }
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white py-3 px-4 rounded-lg
                focus:ring-4 focus:ring-blue-500/50 transition-all backdrop-blur-sm
                flex items-center justify-center space-x-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isLogin ? (
                <>
                  <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Toggle Form Type */}
            <div className="text-center text-sm">
              <p className="text-gray-200">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ email: '', password: '' });
                    setErrors({});
                    setApiError('');
                  }}
                  disabled={isLoading}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium focus:outline-none hover:underline transition-colors disabled:opacity-50"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
