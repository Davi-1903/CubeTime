export default async function getCSRF(): Promise<string> {
    const respose = await fetch('/api/auth/csrf', { credentials: 'include' });
    const data = await respose.json();
    return data.csrfToken;
}
