type Lang = 'es' | 'en';

class Singleton {
    private static instance?: Singleton;

    private constructor() {
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

class WeekDays {

    private lang: Lang;
    private dayEs: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    private dayEn: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    private static instance?: WeekDays;

    constructor(lang: Lang) {
        this.lang = lang;

        if (WeekDays.instance) {
            console.log('Creating instance of week days');
            return WeekDays.instance;
        }

        WeekDays.instance = this;
    }

    getDays() {
        return this.lang === 'es' ? this.dayEs : this.dayEn;
    }

}

const weekDaysES = new WeekDays('es');
const weekDaysEN = new WeekDays('en');

console.log(weekDaysES.getDays());
console.log(weekDaysEN.getDays());