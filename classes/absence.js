class Absence {
    constructor(date, seance, motif, person_id) {
        this.date = date;
        this.seance = seance;
        this.motif = motif;
        this.person_id; person_id;
    }

    modifierAbsence(date, seance, motif) {
        this.date = date;
        this.seance = seance;
        this.motif = motif;
    }
}
module.exports= {
    Absence
}