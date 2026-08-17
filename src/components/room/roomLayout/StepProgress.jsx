import React from 'react';

export const StepProgress = ({ currentStep, onSelectStep }) => {
  const steps = [
    { id: 1, label: 'Thông tin\ncơ bản' },
    { id: 2, label: 'Tiện nghi' },
    { id: 3, label: 'Hình ảnh' },
  ];

  return (
    <div className="py-3 px-3 bg-white border-bottom">
      <div className="d-flex align-items-start justify-content-between position-relative px-2">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <div
                className="step-item text-center"
                style={{ width: '80px', cursor: onSelectStep ? 'pointer' : 'default' }}
                onClick={() => onSelectStep && onSelectStep(step.id)}
              >
                <div
                  className={`step-circle mx-auto ${
                    isActive ? 'active' : isCompleted ? 'completed' : 'inactive'
                  }`}
                >
                  {isCompleted ? <i className="bi bi-check-lg"></i> : step.id}
                </div>
                <span
                  className={`step-label ${
                    isActive
                      ? 'text-primary fw-bold'
                      : isCompleted
                      ? 'text-dark fw-medium'
                      : 'text-secondary'
                  }`}
                  style={{ whiteSpace: 'pre-line', fontSize: '11.5px' }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className="step-line"
                  style={{
                    backgroundColor: currentStep > step.id ? '#0088ff' : '#e9ecef',
                    height: '2px',
                    marginTop: '16px',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
