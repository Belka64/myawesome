async function makePostRequest() {
    const url = 'https://portal.minv.sk/wps/portal/!ut/p/a1/pZLNUsMgFEafxSfggwAJS2gaoDFmaBut2ThZOZnR6sLx-SW1LmJHouPdMZzD_YP05ED64_A-Pg5v48txeJrOvXzgWK3dpsbGKp0hSMO0aFsAPAL3EcAPoTH3sRUVArXONBYMnJ39BDDzC7ePj9aVcCrcZLD0u38JzPy2oRK6a_ZGq47BftW_strx_HrqqGDwpXFlrhrAy9_1n0gw97elQbhlu0r4eF1nCz7E__KD_9G_LHDBvyP9CaGMeWp2ESmCgrZe5mxtKAq6AHicgdQOTkDqkyXXPE0xDXDy-tx9xgGjH_3VB7ZhzjY!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_40CEHJK0J8JJ10Q5547B6N30G4/res/id=contentJsp/c=cacheLevelPage/=/';

    const params = new URLSearchParams();
    params.append('jsp', 'main');
    params.append('lang', 'eng');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.text();

        // Extracting values of input elements with specific names
        const inputNames = ['csrfToken1', 'csrfToken2', 'csrfToken3', 'csrfToken4', 'csrfToken5', 'csrfToken6'];
        const values = {};

        inputNames.forEach(name => {
            const regex = new RegExp(`<input[^>]+name="${name}"[^>]+value="([^"]+)"`, 'i');
            const match = responseData.match(regex);
            if (match) {
                values[name] = match[1]; // Extracting the value
            }
        });

        // Replacing values in the current page's input elements
        Object.keys(values).forEach(name => {
            const inputElement = document.querySelector(`input[name="${name}"]`);
            if (inputElement) {
                inputElement.value = values[name];
            }
        });

        // Resetting and enabling the select element
        const selectElement = document.getElementById('f1-life-situation-select2');
        if (selectElement) {
            selectElement.selectedIndex = 0; // Reset to the first option
            selectElement.disabled = false; // Enable the select element
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
makePostRequest();
