export default async function getCSRF() {
    const respose = await fetch('/api/auth/csrf', { credentials: 'include' });
    const data = await respose.json();
    return data.csrfToken;
}