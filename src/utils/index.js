// Debounce function in plain JavaScript
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Function to truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength) + "...";
    }
};

// Function to get initials from a name
export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    const validWords = words.filter((word) => !!word);
    if (validWords.length === 0) return "";
    const initials = validWords.map((word) => word.charAt(0));
    if (validWords.length === 1 && validWords[0].length > 1) {
        return validWords[0].slice(0, 2).toUpperCase();
    }
    return initials.join("").toUpperCase();
};

// Function to generate a color from a string
export const stringToColor = (string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        // Ensure the value is in the darker range (0-127)
        const darkValue = Math.floor(value / 2);
        color += `00${darkValue.toString(16)}`.slice(-2);
    }

    return color;
};


// Function to generate avatar style and initials from a name
export const stringAvatar = (name) => {
    if (!name) return { sx: { bgcolor: '#ccc' }, children: '?' };
    const words = name.split(' ');
    const initials = words.map((word) => word[0]).join('');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: initials,
    };
};

// Format date range
export const formatDateRange = (date) => {
    if (!date) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const startDate = date[0] ? date[0].toLocaleDateString("en-GB", options) : '';
    const endDate = date[1] ? date[1].toLocaleDateString("en-GB", options) : '';
    return `${startDate} - ${endDate}`;
};


export const formatDate = (str) => {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
};

export const formatDateIntoReadableFormat = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
