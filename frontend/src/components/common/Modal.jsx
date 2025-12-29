// const Modal = ({
//   isOpen,
//   title = "Confirm Action",
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   onConfirm,
//   onCancel,
//   loading = false,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onCancel}
//       />

//       {/* Modal */}
//       <div className="relative z-50 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">
//           {title}
//         </h3>

//         <p className="text-sm text-gray-600 mb-6">
//           {message}
//         </p>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             disabled={loading}
//             className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-60"
//           >
//             {cancelText}
//           </button>

//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 flex items-center gap-2"
//           >
//             {loading && (
//               <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             )}
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
const Modal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  children, // 🔑 IMPORTANT
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title}
        </h3>

        {/* 🔑 THIS IS THE FIX */}
        {children && (
          <div className="mb-6">
            {children}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
