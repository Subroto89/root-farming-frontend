import React from 'react'
import { useTheme } from '../../../../hooks/useTheme';
import useAxiosSecure from '../../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../hooks/useAuth';
import useUserRole from '../../../../hooks/useUserRole';

const InstructionalGuides = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { userRole, userRoleLoading } = useUserRole();


    // Theme Setup
    const {theme} = useTheme();
    const themeBackground = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForeground = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFg = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light";

    // Instructions Fetching from Database
    const {
        data: instructions = [],
        isLoading: instructionsLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["instructions", user?.email, userRole],
        queryFn: async () => {
            if (user?.email && userRole) {
                const {data} = await axiosSecure.get(`/api/guides?role=${userRole}`);
                return data;
            }
            return [];
        },
        enabled: !!user?.email && !!userRole,
    });

    React.useEffect(() => {
        if (isError) {
            console.error("Error fetching instructions:", error);
        }
    }, [isError, error]);

  return (
    <div className={`${themeBackground} min-h-screen p-4 md:p-8`}>
        <h2 className={`text-3xl font-bold mb-6 ${themeForeground}`}>Instructional Guides</h2>
        <div>
            {userRoleLoading || instructionsLoading ? (
                <p className={`${themeForeground}`}>Loading instructions...</p>
            ) : isError ? (
                <p className="text-red-500">Error fetching instructions. Please check the console for details.</p>
            ) : instructions.length > 0 ? (
                <div className="space-y-6">
                    {instructions.map(instruction => (
                        <div key={instruction._id} className={`${themeFgOfFg} p-6 rounded-xl shadow-md`}>
                            <h3 className="text-xl font-semibold text-green-500">{instruction.title}</h3>
                            <img src={instruction.attachment}/>
                            <p className={`mt-3 ${themeForeground} p-4 rounded-lg`}>{instruction.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={`${themeForeground}`}>No instructional guides have been assigned to you yet.</p>
            )}
        </div>
    </div>
  )
}

export default InstructionalGuides