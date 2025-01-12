// src/utils/DateFormatter.js

export class DateFormatter {
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}