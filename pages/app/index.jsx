import AuthPage from '../../components/auth-page';

export default function Dashboard() {
    return (
        <AuthPage authed={true} redirect="/login">
            hello world
            <button onClick={() => user.signOut()}>Logout</button>
        </AuthPage>
    );
}