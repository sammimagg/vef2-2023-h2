'use client';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './SignupForm';

export default function LoginPage() {
    const handleLogin = (email: string, password: string) => {

      };

    return (
      <main className="container">
        <div className="row">
          <div className="col offset-col-3">
            <SignIn/>
          </div>
        </div>
      </main>
     )
}