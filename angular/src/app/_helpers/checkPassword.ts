import { FormGroup } from '@angular/forms';

// trình xác nhận tùy chỉnh để kiểm tra xem hai trường có khớp nhau không
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // trả về nếu trình xác nhận khác đã tìm thấy lỗi trên MatchControl
            return;
        }

        // đặt lỗi trên MatchControl nếu xác nhận thất bại
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}