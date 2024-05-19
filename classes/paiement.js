class FormateurPaiement {
    constructor(cas, date, montant, formatuer_id) {
        this.date = date;
        this.montant = montant;
        this.formateur_id = formateur_id;
        this.cas = cas
    }
}
class ApprenantPaiment {
    constructor(cas, date, montant, notes, group, apprenant_id) {
        this.date = date;
        this.cas = cas;
        this.montant = montant;
        this.notes = notes;
        this.group = group;
        this.apprenant_id = apprenant_id;
    }
}