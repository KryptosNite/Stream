// auth.js
import { supabase } from './supabase.js';

export async function checkSession() {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = 'login.html';
    }
}

export async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}
