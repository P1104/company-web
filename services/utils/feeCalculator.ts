export const calculatePassAmount = (
    instituteType: string,
    gender: string,
    caste: string
): number => {
    if (caste === 'Scheduled Caste' || caste === 'Scheduled Tribe') {
        return 150;
    }

    switch (instituteType) {
        case 'PRIMARY SCHOOL':
            return 150;
        case 'HIGH SCHOOL':
        case 'CBSE':
        case 'ICSE':
            return gender === 'Female / ಮಹಿಳೆ' ? 550 : 750;
        case 'PUC':
            return 1050;
        case 'PUC EVENING':
            return 1630;
        case 'DEGREE':
        case 'PROFESSIONAL':
            return 1300;
        case 'TECHNICAL':
        case 'MEDICAL':
            return 1830;
        case 'EVENING':
        case 'PHD':
        case 'DEGREE EVENING':
        case 'PROFESIONAL EVENING':
        case 'TECHNICAL EVENING':
            return 1630;
        default:
            return 1830;
    }
};

export const getValidityDates = (
    instituteType: string
): { from: string; to: string } => {
    switch (instituteType) {
        case 'PRIMARY SCHOOL':
        case 'HIGH SCHOOL':
        case 'PUC':
        case 'CBSE':
        case 'ICSE':
        case 'PUC EVENING':
            return {
                from: 'June 2025',
                to: 'March 2026'
            };
        case 'DEGREE':
        case 'PROFESSIONAL':
        case 'DEGREE EVENING':
        case 'PROFESIONAL EVENING':
        case 'EVENING':
        case 'PHD':
            return {
                from: 'July 2025',
                to: 'June 2026'
            };
        case 'TECHNICAL':
        case 'MEDICAL':
        case 'TECHNICAL EVENING':
            return {
                from: 'August 2025',
                to: 'July 2026'
            };
        default:
            return {
                from: 'July 2025',
                to: 'June 2026'
            };
    }
};
