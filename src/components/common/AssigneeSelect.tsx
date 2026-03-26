import type { ProjectRole } from "@/lib/apiTypes";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type Props = {
    projectId?: string;
    members: {
        role: ProjectRole;
        joinedAt: string;
        user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
        };
    }[];
    field: {
        name: string;
        value: any;
        onChange: (v: any) => void;
    };
    fieldState?: { invalid?: boolean; error?: any };
};

function AssigneeSelect({ members, field, fieldState }: Props) {
    return (
        <Field data-invalid={fieldState?.invalid}>
            <FieldContent>
                <FieldLabel htmlFor='task-assigneeId'>Assign To</FieldLabel>
                {fieldState?.invalid && (
                    <FieldError errors={[fieldState!.error]} />
                )}
            </FieldContent>
            <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}>
                <SelectTrigger
                    id='task-assigneeId'
                    aria-invalid={fieldState?.invalid}>
                    <SelectValue placeholder='Unassigned' />
                </SelectTrigger>
                <SelectContent position='item-aligned' className='bg-[#263447]'>
                    <SelectItem value='null'>Unassigned</SelectItem>

                    {members.map(member => (
                        <SelectItem key={member.user.id} value={member.user.id}>
                            {member.user.firstName} {member.user.lastName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Field>
    );
}

export default AssigneeSelect;
