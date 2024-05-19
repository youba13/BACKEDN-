class Presence {
    constructor(date, seance, motif, person_id) {
        this.date = date;
        this.seance = seance;
        this.motif = motif;
        this.person_id = person_id;
    }

    modifierPresence(date, seance, motif) {
        this.date = date;
        this.seance = seance;
        this.motif = motif;
    }
}