import * as yup from 'yup';

export const ValidationRules = [
    yup.object({
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('last name is required'),
        address1: yup.string().required('Address1 is required'),
        adress2: yup.string().optional(),
        city: yup.string().required('City name is required'),
        state: yup.string().required('State is required'),
        zip: yup.string().required('Zip is required'),
        contry: yup.string().required('Contry name is required'),
    }),
    yup.object(),
    yup.object({
        cardName: yup.string().required(),
        cardNumber: yup.string().required(),
        expDate: yup.string().required(),
        cvv: yup.string().required()
    })
]