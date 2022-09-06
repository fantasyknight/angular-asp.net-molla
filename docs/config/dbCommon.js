const self = module.exports = {

    diff_years: (dt2, dt1) => {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    },

    diff_month: (d1, d2) => {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return (months + 1) <= 0 ? 0 : (months + 1);
    },

    diff_values: (number) => {
        var value;
        if (number == 0)
            value = 0;

        if (number >= 1 && number <= 5)
            value = 0.05;
        if (number >= 6 && number <= 10)
            value = 0.10;

        if (number >= 11 && number <= 15)
            value = 0.15;
        if (number >= 16 && number <= 20)
            value = 0.20;

        if (number >= 21 && number <= 25)
            value = 0.25;
        if (number >= 26 && number <= 30)
            value = 0.30;

        if (number >= 31 && number <= 35)
            value = 0.35;
        if (number >= 36 && number <= 40)
            value = 0.40;

        if (number >= 41 && number <= 45)
            value = 0.45;
        if (number >= 46 && number <= 50)
            value = 0.50;

        if (number >= 51 && number <= 55)
            value = 0.55;
        if (number >= 56 && number <= 60)
            value = 0.60;

        if (number >= 61 && number <= 65)
            value = 0.65;
        if (number >= 66 && number <= 70)
            value = 0.70;

        if (number >= 71 && number <= 75)
            value = 0.75;
        if (number >= 76 && number <= 80)
            value = 0.80;

        if (number >= 81 && number <= 85)
            value = 0.85;
        if (number >= 86 && number <= 90)
            value = 0.90;

        if (number >= 91 && number <= 95)
            value = 0.95;
        if (number >= 96 && number <= 100)
            value = 1;

        return value;
    },

    log_file: (text) => {
        try {
            const fs = require('fs');
            let _date = new Date().getDate();
            let _month = new Date().getMonth() + 1;
            let _year = new Date().getFullYear();
            //! Get Full-Date
            let fulldate = _date + "-" + _month + '-' + _year;
            fs.appendFile('logs/' + fulldate + '.txt', new Date() + ": " + text + '\n', (err) => {
                if (err) throw err;
            });
        } catch (error) {
            console.log(error);
        }
    }
};