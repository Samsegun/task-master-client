import { X } from "lucide-react";
import { useState } from "react";
import { useMenu } from "../Menu/MenuContext";
import Button from "../common/Button";

interface ProjectFormData {
    name: string;
    description: string;
}

const CreateProjectModal = () => {
    const [formData, setFormData] = useState<ProjectFormData>({
        name: "",
        description: "",
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof ProjectFormData, string>>
    >({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { onClose } = useMenu();

    // if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof ProjectFormData]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Project name is required";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Project name must be at least 3 characters";
        } else if (formData.name.trim().length > 100) {
            newErrors.name = "Project name must not exceed 100 characters";
        }

        if (formData.description.trim().length > 500) {
            newErrors.description =
                "Description must not exceed 500 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // TODO: Replace with actual API call
            console.log("Creating project:", formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset form and close modal
            setFormData({
                name: "",
                description: "",
            });
            onClose();

            // TODO: Show success toast
            // TODO: Refresh projects list or redirect to new project
        } catch (error: any) {
            // Handle specific errors from API
            if (error.response?.data?.error?.message) {
                setErrors({ name: error.response.data.error.message });
            } else {
                console.error("Error creating project:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    function closeModal() {
        // form.reset();
        onClose();
    }

    return (
        <div className='rounded-lg border border-nav-border'>
            {/* header */}
            <div className='flex justify-between items-center p-6 border-b border-gray-700'>
                <h2 className='text-xl font-bold text-white'>
                    Create New Project
                </h2>

                <Button onClick={closeModal} variant={"transparent"}>
                    <X size={24} />
                </Button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className='p-6'>
                {/* Project Name */}
                <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-300 mb-2'>
                        Project Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[#1a2332] border ${
                            errors.name ? "border-red-500" : "border-gray-600"
                        } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder='Enter project name'
                        disabled={isSubmitting}
                        maxLength={100}
                    />
                    {errors.name && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.name}
                        </p>
                    )}
                    <p className='text-gray-400 text-xs mt-1'>
                        {formData.name.length}/100 characters
                    </p>
                </div>

                {/* Description */}
                <div className='mb-6'>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-gray-300 mb-2'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full bg-[#1a2332] border ${
                            errors.description
                                ? "border-red-500"
                                : "border-gray-600"
                        } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                        placeholder='Enter project description (optional)'
                        disabled={isSubmitting}
                        maxLength={500}
                    />
                    {errors.description && (
                        <p className='text-red-500 text-sm mt-1'>
                            {errors.description}
                        </p>
                    )}
                    <p className='text-gray-400 text-xs mt-1'>
                        {formData.description.length}/500 characters
                    </p>
                </div>

                {/* Info Box */}
                <div className='mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3'>
                    <p className='text-blue-400 text-sm'>
                        ℹ️ You will be automatically added as the project owner
                        and can invite team members after creation.
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex gap-3'>
                    <button
                        type='button'
                        onClick={closeModal}
                        // disabled={isSubmitting}
                        className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] disabled:opacity-50 text-white py-2 rounded-lg transition-colors border border-gray-600'>
                        Cancel
                    </button>

                    <Button
                        type='submit'
                        variant={"primary"}
                        form='create-project'
                        // disabled={isSubmitting}
                        className='flex-1'>
                        {/* {isSubmitting ? "Creating..." : "Create Project"} */}
                        Create Project
                    </Button>

                    {/* <button
                        type='submit'
                        disabled={isSubmitting}
                        className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2'>
                        {isSubmitting ? (
                            <>
                                <Loader className='animate-spin' size={18} />
                                Creating...
                            </>
                        ) : (
                            "Create Project"
                        )}
                    </button> */}
                </div>
            </form>
        </div>
        // </div>
    );
};

export default CreateProjectModal;
