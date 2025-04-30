export default function AuthLayout({ children }) {
  return (
    <>
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'url(/login_register.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end opacity-10"></div>
      </div>

      {/* Content container */}
      <div className="flex items-center justify-center relative z-10 ml-200">
        <div className="w-9/12 max-w-md">{children}</div>
      </div>
    </>
  );
}