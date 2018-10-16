/**
 * Created by Alex on 5/18/2018.
 */
import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientApi} from "../../../services/clientapi.service";
import {Validate} from "../../../services/validate.service";
@Component({
    selector: 'page-forgotpassword',
    templateUrl: './forgot-password-modal.component.html',
    styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit{

    public loading = false;
    public error = false;
    public success = false;

    public form: FormGroup

    constructor(
        public activeModal: NgbActiveModal,
        public api: ClientApi,
        public validate: Validate,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
    }

    forgotPassword() {
        if (this.form.valid) {

            this.error = false;
            this.success = false;
            this.loading = true;

            this.api.forgotPassword(this.form.value).subscribe(res => {
                this.loading = false;
                if (res.success) {
                    this.success = true;
                } else {
                    this.error = true;
                }
            }, error => {
                this.loading = false;
            });
        } else {
            this.validate.validateAllFormFields(this.form);
        }
    }
}