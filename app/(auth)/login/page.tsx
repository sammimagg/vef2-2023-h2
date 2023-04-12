'use client';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './LoginForm';

export default function LoginPage() {
    const handleLogin = (email: string, password: string) => {
        // Perform the login action
        console.log(`Email: ${email}, Password: ${password}`);
      };

    return (
      <main className="container">
        <div className="row">
          <div className="col offset-col-3">
            <LogIn/>
          </div>
        </div>
      </main>
     )
}