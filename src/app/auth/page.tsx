import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-tm-green-light flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-tm-green flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🌿
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mon Carnet Végé</h1>
          <p className="text-sm text-gray-500 mt-1">Compatible Thermomix TM5</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-tm-green-mid p-6">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
