import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type MemberShape = {
    user: { id: string; firstName: string; lastName: string };
};

type Props = {
    projectId?: string;
    members?: MemberShape[] | null;
    isLoading: boolean;
    isError: boolean;
    customErr?: { message?: string } | null;
    field: {
        name: string;
        value: any;
        onChange: (v: any) => void;
    };
    fieldState?: { invalid?: boolean; error?: any };
};

function AssigneeSelect({
    members,
    isLoading,
    isError,
    customErr,
    field,
    fieldState,
}: Props) {
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
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger
                    id='task-assigneeId'
                    aria-invalid={fieldState?.invalid}>
                    <SelectValue placeholder='Unassigned' />
                </SelectTrigger>
                <SelectContent position='item-aligned' className='bg-[#263447]'>
                    <SelectItem value='null'>Unassigned</SelectItem>

                    {isLoading && (
                        <SelectItem value='loading' disabled>
                            Loading...
                        </SelectItem>
                    )}

                    {(isError || !members) && (
                        <p>Failed to load members. {customErr?.message}</p>
                    )}

                    {(members ?? []).map(member => (
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
