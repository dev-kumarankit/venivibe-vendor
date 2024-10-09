import { Button, Modal } from "flowbite-react";
import { memo, useEffect, useRef } from "react";
import { Flowbite } from "flowbite-react";

const ShowModalEditor = memo(
  ({
    show,
    close,
    action,
    actionSecondary,
    modalHeader,
    buttonPrimary,
    buttonSecondary,
    modalBody,
    modalClass,
    size,
    disabledPrimaryBtn,
    warningModal,
    modalBodyClass
  }: any) => {
    const modalRef: any = useRef(null);
    const customTheme = {
      modal: {
        root: {
          base: "fixed inset-x-0 top-0 z-[999999999]  h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
          show: {
            on: "flex !bg-black !bg-opacity-60 dark:bg-opacity-80",
            off: "hidden",
          },
        },
        content: {
          base: `relative h-full w-full ${
            warningModal ? "max-w-[25rem]" : ""
          } md:h-auto`,
          inner: `relative flex ${
            warningModal ? "max-w-[25rem]" : ""
          } h-auto modalHeight flex-col rounded-xl bg-white shadow-xl dark:bg-gray-700`,
        },
        body: {
          base: "flex-1  border-0 p-0 pb-5",
          popup: "pt-0",
        },
        header: {
          base: "flex items-center justify-between rounded-xl p-0 pb-5 sticky top-0 bg-white",
          popup: "border-b-0",
          title: "text-xl font-medium !text-primary dark:text-white",
          close: {
            base: "ml-auto inline-flex items-center rounded-md bg-gray-200 p-1.5 text-sm text-gray-900 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            icon: "h-5 w-5",
          },
        },
        footer: {
          base: "flex items-center",
          popup: "border-0",
        },
      },
    };
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          close();
        }
      };

      if (show) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [show, close]);
    return (
      <>
        <Flowbite theme={{ theme: customTheme }}>
          <Modal
            show={show}
            onClose={close}
            size={size}
            className={`bg-[#20283326] ${modalClass}`}
            ref={modalRef}
          >
            <div>
              <Modal.Header className="modal-header">
                <p className="font-medium text-base">{modalHeader}</p>
              </Modal.Header>
              {modalBody && (
                <Modal.Body className="modal-body ">
                  <div className={`w-full ${modalBodyClass}`}>{modalBody}</div>
                </Modal.Body>
              )}

              {buttonPrimary ||
                (buttonSecondary && (
                  <Modal.Footer className="modal-footer">
                    {buttonSecondary && (
                      <Button
                        className="bg-transparent border border-primary text-prmaryText focus:border-primary focus:outline-none focus:ring-0 enabled:hover:bg-transparent rounded-md"
                        onClick={actionSecondary}
                        size="sm"
                      >
                        {buttonSecondary}
                      </Button>
                    )}

                    {buttonPrimary && (
                      <Button
                        className="bg-primary border border-primary text-white enabled:hover:bg-primary focus:outline-none focus:ring-0 focus:border-0 rounded-md"
                        onClick={action}
                        disabled={disabledPrimaryBtn || false}
                        size="sm"
                      >
                        {buttonPrimary}
                      </Button>
                    )}
                  </Modal.Footer>
                ))}
            </div>
          </Modal>
        </Flowbite>
      </>
    );
  }
);

export default ShowModalEditor;
