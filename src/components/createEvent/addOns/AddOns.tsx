import { useState } from "react";
import { minusIcon, plusIcon } from "../../../assets/Icons";
import FormCheckbox from "../../atom/checkbox/Checkbox";
import InputFeild from "../../atom/inputFeild/InputFeild";
import CustomButton from "../../atom/button/CustomButton";
import AddOnsCard from "../addOnsCard/AddOnsCard";
import { eventManagementService } from "../../../services/eventManagementService/EventManagementService";
import { getToast } from "../../atom/toastify/Toastify";
import { customStore } from "../../store/Toggle";
import { add } from "date-fns";

export default function AddOns() {
  const [addOns, setAddOns] = useState([
    {
      id: 1,
      title: "",
      instructions: "",
      fields: [{ id: 1, quantity: "", price: "", label: "" }],
      is_mandatory: false,
    },
  ]);
  const [check, setCheck] = useState();
  const [showAddCard, setShowAddCard] = useState(false);
  const eventId = localStorage.getItem("eventId");
  const [errors, setErrors] = useState([]);
  const {customData,setCustomData}=customStore()
  const handleInputChange = (cardIndex: any, field: any, value: any) => {
    const newAddOns: any = [...addOns];
    newAddOns[cardIndex][field] = value;
    setAddOns(newAddOns);
  };

  const handleFieldChange = (
    cardIndex: any,
    fieldIndex: any,
    field: any,
    value: any
  ) => {
    const newAddOns: any = [...addOns];
    newAddOns[cardIndex].fields[fieldIndex][field] = value;
    setAddOns(newAddOns);
  };

  const addCard = () => {
    setAddOns((prevAddOns) => [
      ...prevAddOns,
      {
        id: prevAddOns.length + 1,
        title: "",
        instructions: "",
        fields: [{ id: 1, quantity: "", price: "", label: "" }],
        is_mandatory: false,
      },
    ]);
  };

  const deleteCard = (id: any) => {
    setAddOns((prevAddOns) => prevAddOns.filter((card) => card.id !== id));
  };

  const handleAddField = (cardIndex: any) => {
    const newAddOns = [...addOns];
    const fields = newAddOns[cardIndex].fields;
    fields.push({ id: fields.length + 1, quantity: "", price: "", label: "" });
    setAddOns(newAddOns);
  };

  const handleDeleteField = (cardIndex: any, fieldId: any) => {
    const newAddOns = [...addOns];
    const fields = newAddOns[cardIndex].fields.filter(
      (field) => field.id !== fieldId
    );
    newAddOns[cardIndex].fields = fields;
    setAddOns(newAddOns);
  };

  // Validation logic
  const validateForm = () => {
    const newErrors: any = [];

    addOns.forEach((card, cardIndex) => {
      if (!card.title) {
        newErrors.push({
          field: `title-${cardIndex}`,
          message: `Add-On ${cardIndex + 1} requires a title.`,
        });
      }
      card.fields.forEach((field, fieldIndex) => {
        if (!field.label) {
          newErrors.push({
            field: `label-${cardIndex}-${fieldIndex}`,
            message: `Add-On ${cardIndex + 1}, Field ${
              fieldIndex + 1
            } requires a label.`,
          });
        }
        if (card.id % 3 === 0 && !field.quantity) {
          newErrors.push({
            field: `quantity-${cardIndex}-${fieldIndex}`,
            message: `Add-On ${cardIndex + 1}, Field ${
              fieldIndex + 1
            } requires a quantity.`,
          });
        }
        if (!field.price) {
          newErrors.push({
            field: `price-${cardIndex}-${fieldIndex}`,
            message: `Add-On ${cardIndex + 1}, Field ${
              fieldIndex + 1
            } requires a price.`,
          });
        }
      });
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

//   const handleAddOns = async (e: any) => {
//     // e.preventDefault();
//     if (!validateForm()) {
//       getToast("error", "Please fix the validation errors before submitting.");
//       return;
//     }

//     const transformedAddOns = addOns.map((addOn) => {
//       let type = "1";
//       if (isSpecialPosition(addOn.id)) {
//         type = "2";
//       } else if (addOn.id % 3 === 0) {
//         type = "3";
//       }
// console.log(addOn.instructions,"instruction123")
    
//         setCustomData({event_id: eventId,
//           instructions: addOn.instructions,
//           title: addOn.title,
//           list: addOn.fields.map((field) => ({
//             label: field.label,
//             price: parseFloat(field.price) || 0,
//             quantity: parseInt(field.quantity, 10) || 0,
//           })),
//           type,
//           is_mandatory: addOn.is_mandatory})
      
//     });

//     // try {
//     //   const response = await addCustomizationApi(transformedAddOns);
//     //   if (response?.success) {
//     //     getToast("success", response?.message);
//     //     setAddOns([
//     //       {
//     //         id: 1,
//     //         title: "",
//     //         instructions: "",
//     //         fields: [{ id: 1, quantity: "", price: "", label: "" }],
//     //         is_mandatory: false,
//     //       },
//     //     ]);
//     //     setShowAddCard(true)
//     //   } else {
//     //     getToast("error", response?.message || "Error Occurred");
//     //   }
//     // } catch (error) {
//     //   console.error("Error creating event:", error);
//     //   getToast("error", "Error Occurred");
//     // }
//   };

const handleAddOns = async (e: any) => {
  // Prevent default form submission behavior
  e.preventDefault();
  
  // Validate the form before proceeding
  if (!validateForm()) {
    getToast("error", "Please fix the validation errors before submitting.");
    return;
  }

  // Process the add-ons data
  addOns.forEach((addOn) => {
    let type = "1";
    if (isSpecialPosition(addOn.id)) {
      type = "2";
    } else if (addOn.id % 3 === 0) {
      type = "3";
    }

    // Set the custom data in the store
    setCustomData({
      event_id: eventId,
      instructions: addOn.instructions,
      title: addOn.title,
      list: addOn.fields?.map((field) => ({
        label: field.label,
        price: parseFloat(field.price) || 0,
        quantity: parseInt(field.quantity, 10) || 0,
      })),
      type,
      is_mandatory: addOn.is_mandatory,
    });
  });
  setShowAddCard(true)
};
  const isSpecialPosition = (id: any) => {
    return (id - 2) % 3 === 0;
  };

  const handleCheck = (e: any) => {
    setCheck(e.target.checked);
  };

  // Helper function to get error for a specific field
  const getError = (fieldName: any) => {
    const errorObj: any = errors.find(
      (error: any) => error.field === fieldName
    );
    return errorObj ? errorObj.message : "";
  };

  return (
    <div>
      {!showAddCard ? (
        <form className="w-full" >
          <div className="w-full flex items-center justify-center">
            <p className="text-[#0C0C0C] font-base text-center w-3/4">
              Add-on allows customers to personalize their event experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((card, cardIndex) => (
              <div key={card.id} className="w-full pt-4">
                <div className="bg-[#EFF9FF] flex justify-between px-6 py-4 rounded-t-xl">
                  <p className="text-[#0C0C0C] font-semibold text-base">
                    Add-Ons {cardIndex + 1}
                  </p>
                  {cardIndex > 0 ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteCard(card.id)}
                    >
                      {minusIcon}
                    </span>
                  ) : (
                    <span
                      className="[&>svg]:w-[24px] [&>svg]:h-[24px] cursor-pointer"
                      onClick={addCard}
                    >
                      {plusIcon}
                    </span>
                  )}
                </div>
                <div className="p-6 border border-[#EBEBEB] rounded-b-xl min-h-[43vh]">
                  <InputFeild
                    labelValue="Add-Ons Title"
                    placeHolder="Eg. Choose Alcohol or Add-Ons"
                    name={`title-${cardIndex}`}
                    color="primary"
                    inputClass="!p-0"
                    labelClass="text-[#212121] font-medium text-sm pb-2"
                    type="text"
                    value={card.title}
                    error={getError(`title-${cardIndex}`)}
                    change={(e) =>
                      handleInputChange(cardIndex, "title", e.target.value)
                    }
                  />
                  {isSpecialPosition(card.id) && (
                    <div className="flex pt-4">
                      <FormCheckbox
                        id="checkData"
                        label=""
                        checked={check}
                        onChange={handleCheck}
                      />
                      <InputFeild
                        placeHolder="Instructions"
                        name={`instructions-${cardIndex}`}
                        color="primary"
                        inputClass="!p-0"
                        labelClass="text-[#212121] font-medium text-sm pb-2"
                        type="text"
                        value={card.instructions}
                        disabled={check ? false : true}
                        change={(e) =>
                          handleInputChange(
                            cardIndex,
                            "instructions",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  <p className="text-[#212121] font-medium text-sm pt-6 pb-2">
                    Add-Ons List
                  </p>
                  {card.fields.map((field, fieldIndex) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-4 pb-2"
                    >
                      <InputFeild
                        placeHolder="Eg. Small"
                        name={`label-${cardIndex}-${fieldIndex}`}
                        color="primary"
                        inputClass="!p-0"
                        type="text"
                        value={field.label}
                        error={getError(`label-${cardIndex}-${fieldIndex}`)} // Pass the error message here
                        change={(e) =>
                          handleFieldChange(
                            cardIndex,
                            fieldIndex,
                            "label",
                            e.target.value
                          )
                        }
                      />
                      <InputFeild
                        placeHolder="Eg. $10"
                        name={`price-${cardIndex}-${fieldIndex}`}
                        color="primary"
                        inputClass="!p-0"
                        type="text"
                        value={field.price}
                        error={getError(`price-${cardIndex}-${fieldIndex}`)} // Pass the error message here
                        change={(e) =>
                          handleFieldChange(
                            cardIndex,
                            fieldIndex,
                            "price",
                            e.target.value
                          )
                        }
                      />
                      {card.id % 3 === 0 && (
                        <InputFeild
                          placeHolder="Enter Quantity"
                          name={`quantity-${cardIndex}-${fieldIndex}`}
                          color="primary"
                          inputClass="!p-0"
                          type="text"
                          value={field.quantity}
                          error={getError(
                            `quantity-${cardIndex}-${fieldIndex}`
                          )} // Pass the error message here
                          change={(e) =>
                            handleFieldChange(
                              cardIndex,
                              fieldIndex,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      )}
                      {fieldIndex > 0 ? (
                        <span
                          className="cursor-pointer"
                          onClick={() => handleDeleteField(cardIndex, field.id)}
                        >
                          {minusIcon}
                        </span>
                      ) : (
                        <span
                          className="[&>svg]:w-[24px] [&>svg]:h-[24px] cursor-pointer"
                          onClick={() => handleAddField(cardIndex)}
                        >
                          {plusIcon}
                        </span>
                      )}
                    </div>
                  ))}
                  <FormCheckbox
                    id={`is_mandatory-${cardIndex}`}
                    label="Make Mandatory"
                    checked={card.is_mandatory}
                    onChange={(e: any) =>
                      handleInputChange(
                        cardIndex,
                        "is_mandatory",
                        e.target.checked
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 py-4 justify-end">
            <CustomButton
              type="button"
              name="Back"
              color={" "}
              buttonClass="border font-semibold text-gray text-sm rounded-xl px-7 py-4"
            />
            <CustomButton
              type="button"
              name="Save and Next"
              color={" "}
              action={handleAddOns}
              buttonClass="bg-gradient-primary font-semibold text-white text-sm px-7 rounded-xl py-4"
            />
          </div>
        </form>
      ) : (
        <AddOnsCard />
      )}
    </div>
  );
}
