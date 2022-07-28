import AuthRouter from '../../lib/auth-router';

export default function Dashboard() {
    return (
        <div>
            <AuthRouter authed={true} redirect="/login" />
            hello world
            <button onClick={() => user.signOut()}>Logout</button>
        </div>
    );
}