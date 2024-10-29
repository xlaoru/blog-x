export const fetchWithAuth = async (url: string, options: RequestInit) => {
    const headers = {
        ...options.headers,
    };
    
    try {
        const response = await fetch(url, { ...options, headers });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].msg);
        }

        console.count("fetched without refresh");

        return response;
    } catch (error) {
        const refreshToken = await fetch("http://localhost:3001/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        if (!refreshToken.ok) {
            throw new Error("Refresh token failed");
        }

        const { accessToken } = await refreshToken.json();

        const response = await fetch(url, { ...options, headers: { ...headers, "Authorization": `Bearer ${accessToken}` } });

        console.count("fetched with refresh");

        return response;
    }
};