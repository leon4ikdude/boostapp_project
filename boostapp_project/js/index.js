const firstName = $("#first-name")
const surName = $("#surname")
const phoneInputContainer = $(".input-container-2")
const phoneInputField = $("#phone-num")
const confirmationCode = $(".input-container-3")
const confiramtionBtn = $(".confirmation-btn-disabled")
const spinner = $(".loader")
const btnText = $(".btn-text")
const adultRadio = $("#adult")
const minorRadio = $("#minor")
const verificationIcon = $(".inner-icon")
const backgroundLinkError = "icons/error-svgrepo-com.svg"
const backgroundLinkVerified = "icons/badge-check-light.svg"
const backgroundLinkCorrect = "icons/check-circle-light.svg"
const birthdayInput = $(".input-container-4")
const selectInput = $(".radio-selection").hide()
const initElementsToHide = [spinner, verificationIcon, confirmationCode, phoneInputContainer, confiramtionBtn, birthdayInput, selectInput]



$("document").ready(function () {

    initElementsToHide.forEach(element => {
        element.hide()
    });


    firstName.keypress(function () {
        if (this.value.length && surName.val().length) { phoneInputContainer.show(200) }
    })

    surName.keypress(function () {
        if (this.value.length && firstName.val().length) { phoneInputContainer.show(200) }
    })

    adultRadio.click(function () {
        $("#adult > img").attr("src", "icons/dot-circle-regular.svg");
        $("#minor > img").attr("src", "icons/circle-regular.svg");

    });

    minorRadio.click(function () {
        $("#minor > img").attr("src", "icons/dot-circle-regular.svg");
        $("#adult > img").attr("src", "icons/circle-regular.svg");

    });





    phoneInputField.keypress(function () {

        if (this.value.length === 9 && phoneInputField.val().startsWith("05")) {
            verificationIcon.css("background-image", `url("${backgroundLinkCorrect}")`)
            verificationIcon.show(20)
            confirmationCode.show(100)
            confiramtionBtn.show(100)

        }
        else {
            if (this.value.length === 10) {
                return false
            }
        }
    })


    phoneInputField.keyup(function () {
        if (this.value.length < 10) {
            verificationIcon.css("background-image", `url("${backgroundLinkError}")`)
            verificationIcon.show(20)
        }
    })



    $("#confirmation-code").keypress(function () {
        if (this.value.length === 4) {
            confiramtionBtn.prop('disabled', false);
            confiramtionBtn.removeClass("confirmation-btn-disabled");
            confiramtionBtn.addClass("confirmation-btn");
            return false
        }
    })

    $("form").validate({
        rules: {
            name: "required",
            surName: "required",
            number: {
                required: true,
                minlength: 10,
            },
            code: {
                required: true,
                minlength: 4,
                maxlength: 4,
            }
        },
        messages: {
            name: "אנא הכנס שם פרטי",
            surName: "אנא הכנס שם משפחה",
            number: {
                required: "אנא הכנס מספר טלפון",
                minlength: "טלפון לא תקין",
            },
            code: "קוד שהוקש לא תקין, אנא נסו שנית"
        },

        submitHandler: function () {
            spinner.show(20)
            btnText.text("מאמת")
            setTimeout(() => {

                if (phoneInputField.val().startsWith("05")) {
                    verificationIcon.css("background-image", `url("${backgroundLinkVerified}")`)
                    verificationIcon.show(20)
                    spinner.hide(20)
                    confiramtionBtn.hide(100)
                    confirmationCode.hide(100)
                    $(".input-container-4").show(100)
                    $(".radio-selection").show(100)
                    phoneInputField.prop('disabled', true);
                    surName.prop('disabled', true);
                    firstName.prop('disabled', true);
                }
                else {
                    verificationIcon.css("background-image", `url("${backgroundLinkError}")`)
                    btnText.text("אמת מספר")
                    spinner.hide(20)
                    verificationIcon.show(20)
                }

                return false;
            }, 500);

        },
    });
})

