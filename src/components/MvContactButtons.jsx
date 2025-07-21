import { ACTION_LOGS_TYPES } from '@utils/Constants'
import { useAuth } from '@utils/AuthContext'

const MvContactButtons = ({ id, owner, supervisor }) => {
  const { user } = useAuth();
  const addToLogs = async (type) => {
    const payload = {
      type: type,
      userId: user.id,
      role: user.role,
      email: user.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
      metadata: {
        propertyId: id,
      }
    };
    allAPIs.addToLogs(payload)
  };
  return (
    <div className="fixed z-50 md:hidden bottom-0 left-0 right-0 bg-white shadow-lg border-t border-blue-100">
      <div className="flex justify-center gap-4 p-3 text-xs">
        <a
          href={`tel:${owner}`}
          onClick={() => addToLogs(ACTION_LOGS_TYPES.CONTACTED_OWNER)}
          className="flex-1 bg-gradient-to-b text-center from-blue-700 to-blue-800 text-white py-2 rounded-lg font-medium"
        >
          Contact Owner
        </a>
        <a
          href={`tel:${supervisor}`}
          onClick={() => addToLogs(ACTION_LOGS_TYPES.CONTACTED_OWNER)}
          className="flex-1 border-2 border-blue-700 text-center text-blue-700 py-2 rounded-lg font-medium"
        >
          Contact Supervisor
        </a>
      </div>
    </div>
  );
};

export default MvContactButtons;
