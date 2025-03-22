import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';

import { ErrorOutlineIcon } from '@wsh-2025/client/src/features/auth/components/SignInDialog';
import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignOutDialog = ({ isOpen, onClose }: Props) => {
  const authActions = useAuthActions();

  const onSubmit = async () => {
    try {
      await authActions.signOut();

      alert('ログアウトしました');
      onClose();
      return;
    } catch {
      return { [FORM_ERROR]: '不明なエラーが発生しました' };
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="size-full">
        <div className="mb-[16px] flex w-full flex-row justify-center">
          <img className="object-contain" height={36} src="/public/arema.svg" width={98} />
        </div>

        <h2 className="mb-[24px] text-center text-[24px] font-bold">ログアウト</h2>

        <Form onSubmit={onSubmit}>
          {({ handleSubmit, submitError }) => (
            <form className="mb-[16px]" onSubmit={(ev) => void handleSubmit(ev)}>
              <div className="mb-[24px] flex w-full items-center rounded-[4px] border-[2px] border-solid border-[#DDAA00] bg-[#fffcee] p-[8px] text-[14px] font-bold text-[#DDAA00]">
                <svg
                  className="mr-[4px]"
                  fill="currentColor"
                  height="20"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.725 21q-.275 0-.5-.137t-.35-.363t-.137-.488t.137-.512l9.25-16q.15-.25.388-.375T12 3t.488.125t.387.375l9.25 16q.15.25.138.513t-.138.487t-.35.363t-.5.137zm1.725-2h15.1L12 6zM12 18q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.712T12 10t-.712.288T11 11v3q0 .425.288.713T12 15m0-2.5" />
                </svg>
                <span>プレミアムエピソードが視聴できなくなります。</span>
              </div>

              {submitError ? (
                <div className="mb-[8px] flex w-full flex-row items-center justify-start rounded-[4px] border-[2px] border-solid border-[#F0163A] bg-[#ffeeee] p-[8px] text-[14px] font-bold text-[#F0163A]">
                  <ErrorOutlineIcon />
                  <span>{submitError}</span>
                </div>
              ) : null}

              <div className="flex flex-row justify-center">
                <button
                  className="block flex w-[160px] flex-row items-center justify-center rounded-[4px] bg-[#1c43d1] p-[12px] text-[14px] font-bold text-[#ffffff] disabled:opacity-50"
                  type="submit"
                >
                  ログアウト
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </Dialog>
  );
};
