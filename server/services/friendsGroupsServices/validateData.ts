
export default function (
    params:
        {
            members: any,
            name: any,
            type: any
        }) {
    try {
        const errors: string[] = [];
        if (!(params.members)||params.type===undefined) {
            errors.push("Some of the fields are empty like members,id,name,type");
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