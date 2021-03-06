import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CoOrientador } from './co-orientador.model';
import { CoOrientadorPopupService } from './co-orientador-popup.service';
import { CoOrientadorService } from './co-orientador.service';
import { Aluno, AlunoService } from '../aluno';
import { Professor, ProfessorService } from '../professor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-co-orientador-dialog',
    templateUrl: './co-orientador-dialog.component.html'
})
export class CoOrientadorDialogComponent implements OnInit {

    coOrientador: CoOrientador;
    isSaving: boolean;

    alunos: Aluno[];

    professors: Professor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private coOrientadorService: CoOrientadorService,
        private alunoService: AlunoService,
        private professorService: ProfessorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alunoService.query()
            .subscribe((res: ResponseWrapper) => { this.alunos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.professorService.query()
            .subscribe((res: ResponseWrapper) => { this.professors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.coOrientador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.coOrientadorService.update(this.coOrientador));
        } else {
            this.subscribeToSaveResponse(
                this.coOrientadorService.create(this.coOrientador));
        }
    }

    private subscribeToSaveResponse(result: Observable<CoOrientador>) {
        result.subscribe((res: CoOrientador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CoOrientador) {
        this.eventManager.broadcast({ name: 'coOrientadorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-co-orientador-popup',
    template: ''
})
export class CoOrientadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private coOrientadorPopupService: CoOrientadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.coOrientadorPopupService
                    .open(CoOrientadorDialogComponent as Component, params['id']);
            } else {
                this.coOrientadorPopupService
                    .open(CoOrientadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
