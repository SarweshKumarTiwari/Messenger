
export default function (
    params:
        {
            members: any,
            name: any,
            type: any
        }) {
    try {
        const errors: string[] = [];
        if (!(params.members && params.name)||params.type===undefined) {
            errors.push("Some of the fields are empty like members,id,name,type");
        }
        if (typeof params.name !== "string") {
            errors.push("types of id and name should be in string");
        }
        if (typeof params.type!=="number") {
            errors.push("type should be 1 or 0");
        }
        return errors;
    }
    catch{
        return ["Some error occured please check given values members should be an array"]
    }
}