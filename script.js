new Vue({
    el: '#app',
    data: {
        filterText: '',
        rows: [
            { land: 'China', co2ges: 21000, unternehmen: 'China National Petroleum', co2: 8000 },
            { land: 'USA', co2ges: 10000, unternehmen: 'ExxonMobil', co2: 5000 },
            { land: 'Indien', co2ges: 5400, unternehmen: 'Reliance Industries', co2: 3200 },
            { land: 'Russland', co2ges: 5600, unternehmen: 'Gazprom', co2: 3500 },
            { land: 'Japan', co2ges: 4600, unternehmen: 'Toyota', co2: 2500 },
            { land: 'Deutschland', co2ges: 4200, unternehmen: 'Volkswagen', co2: 2200 },
            { land: 'Südkorea', co2ges: 3800, unternehmen: 'Samsung Electronics', co2: 1800 },
            { land: 'Kanada', co2ges: 3650, unternehmen: 'Suncor Energy', co2: 1700 },
            { land: 'Brasilien', co2ges: 3550, unternehmen: 'Petrobras', co2: 1600 },
            { land: 'Mexiko', co2ges: 3200, unternehmen: 'Grupo Bimbo', co2: 1400 },
            { land: 'Indonesien', co2ges: 3000, unternehmen: 'PT Pertamina', co2: 1300 },
            { land: 'Australien', co2ges: 2800, unternehmen: 'BHP Group', co2: 1200 },
            { land: 'UK', co2ges: 2700, unternehmen: 'Royal Dutch Shell', co2: 1100 },
            { land: 'Frankreich', co2ges: 2600, unternehmen: 'Airbus', co2: 1000 },
            { land: 'Italien', co2ges: 2500, unternehmen: 'Eni', co2: 950 }
        ],
        sortBy: null,
        sortAsc: true
    },
    computed: {
        filteredRows() {
            // Sanitize filterText before using
            const sanitizedFilter = this.sanitizeInput(this.filterText);
            return this.rows
                .filter(row => {
                    const filter = sanitizedFilter.toLowerCase();
                    return row.land.toLowerCase().includes(filter) || row.unternehmen.toLowerCase().includes(filter);
                })
                .sort((a, b) => {
                    if (this.sortBy === null) return 0;
                    const aValue = a[this.sortBy];
                    const bValue = b[this.sortBy];

                    // Zahlen korrekt vergleichen
                    if (typeof aValue === 'number' && typeof bValue === 'number') {
                        return this.sortAsc ? aValue - bValue : bValue - aValue;
                    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                        return this.sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                    }
                    return 0;
                });
        }
    },
    methods: {
        // Sanitization Methode hinzufügen
        sanitizeInput(input) {
            if (!input) return '';
            return input.toString()
                .replace(/[<>'"]/g, '')  // Entfernt potenziell gefährliche Zeichen
                .replace(/javascript:/gi, '')  // Verhindert JavaScript-Injection
                .trim();  // Entfernt Leerzeichen am Anfang und Ende
        },
        
        sortTable(columnIndex) {
            const columns = ['land', 'co2ges', 'unternehmen', 'co2']; // Spaltenindizes
            if (this.sortBy === columns[columnIndex]) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortBy = columns[columnIndex];
                this.sortAsc = true;
            }
        },
        setLanguage(lang) {
            const html = document.documentElement;
            if (lang === 'ar' || lang === 'he') {
                html.setAttribute('dir', 'rtl');
            } else {
                html.setAttribute('dir', 'ltr');
            }
            html.setAttribute('lang', lang);
        },
        detectAndSetLanguage() {
            const browserLang = navigator.language || navigator.userLanguage;
            const lang = browserLang.split('-')[0]; // "de-DE" wird zu "de"
            this.setLanguage(lang);
        }
    },
    created() {
        this.detectAndSetLanguage(); // Statt this.setLanguage(document.documentElement.lang);
    }
});
