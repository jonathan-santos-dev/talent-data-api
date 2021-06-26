import { Role } from "../types/Role";

const HoleAndLevels = {
    'senior': [0, 1, 2],
    'middle': [0, 2],
    'junior': [2],
    'intern': [0, 1, 2],
}

export const HasPermission = (roles: Role[], level: number, organization?: string) => {

    for (const role of roles) {
        switch (role) {
            case Role.senior:
            case Role.middle:
            case Role.junior:
                return HoleAndLevels[role].includes(level);

            case Role.intern:
                return organization == "STUFF A" && HoleAndLevels[role].includes(level);
        }
    }
    return false;
}

