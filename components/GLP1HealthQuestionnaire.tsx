'use client'

import { useState } from 'react'

interface GLP1HealthQuestionnaireProps {
  onComplete: (data: any) => void
  onPrevious: () => void
}

export default function GLP1HealthQuestionnaire({ onComplete, onPrevious }: GLP1HealthQuestionnaireProps) {
  const [formData, setFormData] = useState({
    // Section 1: Absolute Contraindications
    medullaryThyroidCancer: '',
    men2Syndrome: '',
    allergicReaction: '',
    age: '',
    pregnancyStatus: '',
    
    // Section 2: Treatment Pathway
    primaryReason: '',
    
    // Section 3: BMI and Ethnicity
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    ethnicity: '',
    
    // Section 4A: Type 2 Diabetes Pathway
    diabetesDuration: '',
    diabetesMedications: [] as string[],
    currentMedicationCount: '',
    medicationIntolerance: '',
    medicationIntoleranceDetails: '',
    occupationalImpact: '',
    
    // Section 4B: Weight Management Pathway
    weightConditions: [] as string[],
    conditionCount: '',
    
    // Section 5: Medical History
    medicalHistory: [] as string[],
    currentMedications: [] as string[],
    bariatricSurgery: '',
    
    // Section 6: Commitment
    wraparoundCare: '',
    selfInject: ''
  })

  const [currentSection, setCurrentSection] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [eligibilityStatus, setEligibilityStatus] = useState<'checking' | 'eligible' | 'ineligible' | null>(null)

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => {
      const array = prev[field as keyof typeof prev] as string[]
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) }
      } else {
        return { ...prev, [field]: [...array, value] }
      }
    })
  }

  const calculateBMI = () => {
    const height = parseFloat(formData.height)
    const weight = parseFloat(formData.weight)
    
    if (!height || !weight) return null
    
    // Convert to meters and kg if needed
    const heightInM = formData.heightUnit === 'cm' ? height / 100 : height * 0.3048
    const weightInKg = formData.weightUnit === 'kg' ? weight : weight * 0.453592
    
    return (weightInKg / (heightInM * heightInM)).toFixed(1)
  }

  const checkEligibility = () => {
    // Automatic disqualifications
    if (
      formData.age === 'Under 18 years' ||
      formData.pregnancyStatus === 'Yes' ||
      formData.medullaryThyroidCancer === 'Yes' ||
      formData.men2Syndrome === 'Yes' ||
      formData.allergicReaction === 'Yes'
    ) {
      return 'ineligible'
    }
    
    // Further eligibility checks would go here based on pathway
    return 'eligible'
  }

  const validateSection = (section: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (section) {
      case 1:
        if (!formData.medullaryThyroidCancer) newErrors.medullaryThyroidCancer = 'This field is required'
        if (!formData.men2Syndrome) newErrors.men2Syndrome = 'This field is required'
        if (!formData.allergicReaction) newErrors.allergicReaction = 'This field is required'
        if (!formData.age) newErrors.age = 'This field is required'
        if (!formData.pregnancyStatus) newErrors.pregnancyStatus = 'This field is required'
        break
      case 2:
        if (!formData.primaryReason) newErrors.primaryReason = 'This field is required'
        break
      case 3:
        if (!formData.height) newErrors.height = 'Height is required'
        if (!formData.weight) newErrors.weight = 'Weight is required'
        if (!formData.ethnicity) newErrors.ethnicity = 'This field is required'
        break
      case 4:
        if (formData.primaryReason === 'Type 2 diabetes management' || formData.primaryReason === 'Both type 2 diabetes and weight management') {
          if (!formData.diabetesDuration) newErrors.diabetesDuration = 'This field is required'
          if (!formData.currentMedicationCount) newErrors.currentMedicationCount = 'This field is required'
          if (!formData.medicationIntolerance) newErrors.medicationIntolerance = 'This field is required'
          if (!formData.occupationalImpact) newErrors.occupationalImpact = 'This field is required'
        }
        if (formData.primaryReason === 'Weight loss/weight management' || formData.primaryReason === 'Both type 2 diabetes and weight management') {
          if (!formData.conditionCount) newErrors.conditionCount = 'This field is required'
        }
        break
      case 5:
        if (!formData.bariatricSurgery) newErrors.bariatricSurgery = 'This field is required'
        break
      case 6:
        if (!formData.wraparoundCare) newErrors.wraparoundCare = 'This field is required'
        if (!formData.selfInject) newErrors.selfInject = 'This field is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection === 1) {
        // Check immediate disqualifications after section 1
        const status = checkEligibility()
        if (status === 'ineligible') {
          setEligibilityStatus('ineligible')
          return
        }
      }
      
      if (currentSection < 6) {
        setCurrentSection(currentSection + 1)
      } else {
        // Final submission
        const finalStatus = checkEligibility()
        setEligibilityStatus(finalStatus as 'eligible' | 'ineligible')
        if (finalStatus === 'eligible') {
          onComplete(formData)
        }
      }
    }
  }

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    } else {
      onPrevious()
    }
  }

  if (eligibilityStatus === 'ineligible') {
    return (
      <div className="booking-page">
        <div className="eligibility-result ineligible">
          <div className="result-icon">✕</div>
          <h2 className="result-title">Not Eligible for GLP-1 Treatment</h2>
          <p className="result-message">
            Based on your responses, you are not currently eligible for GLP-1 medication. 
            This is for your safety, as certain conditions or circumstances make these medications unsuitable.
          </p>
          <p className="result-submessage">
            Please consult with your GP or healthcare provider for alternative treatment options.
          </p>
          <button className="booking-button" onClick={onPrevious}>
            RETURN TO SERVICES
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page glp1-questionnaire">
      <button className="previous-button" onClick={handlePrevious}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        {currentSection === 1 ? 'Back to Details' : 'Previous Section'}
      </button>

      <div className="booking-header">
        <h2 className="booking-title">GLP-1 Eligibility Assessment</h2>
        <p className="booking-subtitle">
          Please complete this medical questionnaire to determine your eligibility for GLP-1 treatment.
        </p>
        <div className="medical-disclaimer">
          <svg className="disclaimer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <p>A doctor will review and approve your case before any prescription can be issued.</p>
        </div>
      </div>

      <div className="section-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentSection / 6) * 100}%` }} />
        </div>
        <p className="progress-text">Section {currentSection} of 6</p>
      </div>

      <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
        {/* Section 1: Absolute Contraindications */}
        {currentSection === 1 && (
          <>
            <h3 className="section-title">Section 1: Safety Screening</h3>

            <div className="form-group">
              <label className="form-label">
                1. Have you or any blood relatives ever been diagnosed with medullary thyroid cancer (MTC)? *
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="medullaryThyroidCancer"
                    value="Yes"
                    checked={formData.medullaryThyroidCancer === 'Yes'}
                    onChange={(e) => updateField('medullaryThyroidCancer', e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="medullaryThyroidCancer"
                    value="No"
                    checked={formData.medullaryThyroidCancer === 'No'}
                    onChange={(e) => updateField('medullaryThyroidCancer', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="medullaryThyroidCancer"
                    value="Not sure"
                    checked={formData.medullaryThyroidCancer === 'Not sure'}
                    onChange={(e) => updateField('medullaryThyroidCancer', e.target.value)}
                  />
                  Not sure
                </label>
              </div>
              {errors.medullaryThyroidCancer && <span className="error-text">{errors.medullaryThyroidCancer}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                2. Have you been diagnosed with Multiple Endocrine Neoplasia syndrome type 2 (MEN2)? *
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="men2Syndrome"
                    value="Yes"
                    checked={formData.men2Syndrome === 'Yes'}
                    onChange={(e) => updateField('men2Syndrome', e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="men2Syndrome"
                    value="No"
                    checked={formData.men2Syndrome === 'No'}
                    onChange={(e) => updateField('men2Syndrome', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="men2Syndrome"
                    value="Not sure"
                    checked={formData.men2Syndrome === 'Not sure'}
                    onChange={(e) => updateField('men2Syndrome', e.target.value)}
                  />
                  Not sure
                </label>
              </div>
              {errors.men2Syndrome && <span className="error-text">{errors.men2Syndrome}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                3. Have you ever had an allergic reaction to tirzepatide or any GLP-1 receptor agonist medications? *
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="allergicReaction"
                    value="Yes"
                    checked={formData.allergicReaction === 'Yes'}
                    onChange={(e) => updateField('allergicReaction', e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="allergicReaction"
                    value="No"
                    checked={formData.allergicReaction === 'No'}
                    onChange={(e) => updateField('allergicReaction', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="allergicReaction"
                    value="Not sure"
                    checked={formData.allergicReaction === 'Not sure'}
                    onChange={(e) => updateField('allergicReaction', e.target.value)}
                  />
                  Not sure
                </label>
              </div>
              {errors.allergicReaction && <span className="error-text">{errors.allergicReaction}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">4. What is your age? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="age"
                    value="Under 18 years"
                    checked={formData.age === 'Under 18 years'}
                    onChange={(e) => updateField('age', e.target.value)}
                  />
                  Under 18 years
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="age"
                    value="18-65 years"
                    checked={formData.age === '18-65 years'}
                    onChange={(e) => updateField('age', e.target.value)}
                  />
                  18-65 years
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="age"
                    value="Over 65 years"
                    checked={formData.age === 'Over 65 years'}
                    onChange={(e) => updateField('age', e.target.value)}
                  />
                  Over 65 years
                </label>
              </div>
              {errors.age && <span className="error-text">{errors.age}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                5. Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 2 months? *
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="pregnancyStatus"
                    value="Yes"
                    checked={formData.pregnancyStatus === 'Yes'}
                    onChange={(e) => updateField('pregnancyStatus', e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="pregnancyStatus"
                    value="No"
                    checked={formData.pregnancyStatus === 'No'}
                    onChange={(e) => updateField('pregnancyStatus', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="pregnancyStatus"
                    value="Not applicable"
                    checked={formData.pregnancyStatus === 'Not applicable'}
                    onChange={(e) => updateField('pregnancyStatus', e.target.value)}
                  />
                  Not applicable
                </label>
              </div>
              {errors.pregnancyStatus && <span className="error-text">{errors.pregnancyStatus}</span>}
            </div>
          </>
        )}

        {/* Section 2: Treatment Pathway */}
        {currentSection === 2 && (
          <>
            <h3 className="section-title">Section 2: Treatment Pathway</h3>

            <div className="form-group">
              <label className="form-label">6. What is your primary reason for considering Mounjaro? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="primaryReason"
                    value="Type 2 diabetes management"
                    checked={formData.primaryReason === 'Type 2 diabetes management'}
                    onChange={(e) => updateField('primaryReason', e.target.value)}
                  />
                  Type 2 diabetes management
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="primaryReason"
                    value="Weight loss/weight management"
                    checked={formData.primaryReason === 'Weight loss/weight management'}
                    onChange={(e) => updateField('primaryReason', e.target.value)}
                  />
                  Weight loss/weight management
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="primaryReason"
                    value="Both type 2 diabetes and weight management"
                    checked={formData.primaryReason === 'Both type 2 diabetes and weight management'}
                    onChange={(e) => updateField('primaryReason', e.target.value)}
                  />
                  Both type 2 diabetes and weight management
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="primaryReason"
                    value="Other medical condition"
                    checked={formData.primaryReason === 'Other medical condition'}
                    onChange={(e) => updateField('primaryReason', e.target.value)}
                  />
                  Other medical condition
                </label>
              </div>
              {errors.primaryReason && <span className="error-text">{errors.primaryReason}</span>}
            </div>
          </>
        )}

        {/* Section 3: BMI and Ethnicity */}
        {currentSection === 3 && (
          <>
            <h3 className="section-title">Section 3: BMI and Ethnicity</h3>

            <div className="form-group">
              <label className="form-label">7. What is your current height and weight? *</label>
              <div className="measurement-group">
                <div className="measurement-input">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Height"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                  />
                  <select 
                    className="unit-select"
                    value={formData.heightUnit}
                    onChange={(e) => updateField('heightUnit', e.target.value)}
                  >
                    <option value="cm">cm</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
                {errors.height && <span className="error-text">{errors.height}</span>}
                
                <div className="measurement-input">
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Weight"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                  />
                  <select 
                    className="unit-select"
                    value={formData.weightUnit}
                    onChange={(e) => updateField('weightUnit', e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
                {errors.weight && <span className="error-text">{errors.weight}</span>}
              </div>
              {formData.height && formData.weight && (
                <p className="bmi-display">Your BMI: {calculateBMI()}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                8. What is your ethnic background? *
                <span className="form-helper-text">This affects BMI thresholds for eligibility</span>
              </label>
              <select 
                className="form-select"
                value={formData.ethnicity}
                onChange={(e) => updateField('ethnicity', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="White British/European">White British/European</option>
                <option value="Black African or African-Caribbean">Black African or African-Caribbean</option>
                <option value="South Asian">South Asian (Indian, Pakistani, Bangladeshi)</option>
                <option value="Chinese or East Asian">Chinese or East Asian</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Mixed ethnicity">Mixed ethnicity</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.ethnicity && <span className="error-text">{errors.ethnicity}</span>}
            </div>
          </>
        )}

        {/* Section 4: Pathway-specific questions */}
        {currentSection === 4 && (
          <>
            {(formData.primaryReason === 'Type 2 diabetes management' || formData.primaryReason === 'Both type 2 diabetes and weight management') && (
              <>
                <h3 className="section-title">Section 4A: Type 2 Diabetes Pathway</h3>

                <div className="form-group">
                  <label className="form-label">9. How long have you been diagnosed with Type 2 diabetes? *</label>
                  <select 
                    className="form-select"
                    value={formData.diabetesDuration}
                    onChange={(e) => updateField('diabetesDuration', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Less than 6 months">Less than 6 months</option>
                    <option value="6 months - 2 years">6 months - 2 years</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="More than 5 years">More than 5 years</option>
                    <option value="Not diagnosed with Type 2 diabetes">Not diagnosed with Type 2 diabetes</option>
                  </select>
                  {errors.diabetesDuration && <span className="error-text">{errors.diabetesDuration}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">10. Which diabetes medications have you tried? (Select all that apply)</label>
                  <div className="checkbox-group-vertical">
                    {['Metformin', 'Sulfonylureas (e.g., gliclazide)', 'DPP-4 inhibitors (e.g., sitagliptin)', 
                      'SGLT-2 inhibitors (e.g., dapagliflozin)', 'Pioglitazone', 'Insulin', 
                      'Other GLP-1 medications (e.g., semaglutide, liraglutide)', 'None'].map(med => (
                      <label key={med} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.diabetesMedications.includes(med)}
                          onChange={() => toggleArrayField('diabetesMedications', med)}
                        />
                        {med}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">11. How many different diabetes medications are you currently taking? *</label>
                  <select 
                    className="form-select"
                    value={formData.currentMedicationCount}
                    onChange={(e) => updateField('currentMedicationCount', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="None">None</option>
                    <option value="1 medication">1 medication</option>
                    <option value="2 medications">2 medications</option>
                    <option value="3 or more medications">3 or more medications</option>
                  </select>
                  {errors.currentMedicationCount && <span className="error-text">{errors.currentMedicationCount}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    12. Have you been unable to tolerate or had contraindications to any diabetes medications? *
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="medicationIntolerance"
                        value="Yes"
                        checked={formData.medicationIntolerance === 'Yes'}
                        onChange={(e) => updateField('medicationIntolerance', e.target.value)}
                      />
                      Yes
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="medicationIntolerance"
                        value="No"
                        checked={formData.medicationIntolerance === 'No'}
                        onChange={(e) => updateField('medicationIntolerance', e.target.value)}
                      />
                      No
                    </label>
                  </div>
                  {formData.medicationIntolerance === 'Yes' && (
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Please specify..."
                      value={formData.medicationIntoleranceDetails}
                      onChange={(e) => updateField('medicationIntoleranceDetails', e.target.value)}
                    />
                  )}
                  {errors.medicationIntolerance && <span className="error-text">{errors.medicationIntolerance}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    13. Would using insulin significantly impact your occupation (e.g., professional driver, pilot)? *
                  </label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="occupationalImpact"
                        value="Yes"
                        checked={formData.occupationalImpact === 'Yes'}
                        onChange={(e) => updateField('occupationalImpact', e.target.value)}
                      />
                      Yes
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="occupationalImpact"
                        value="No"
                        checked={formData.occupationalImpact === 'No'}
                        onChange={(e) => updateField('occupationalImpact', e.target.value)}
                      />
                      No
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="occupationalImpact"
                        value="Not applicable"
                        checked={formData.occupationalImpact === 'Not applicable'}
                        onChange={(e) => updateField('occupationalImpact', e.target.value)}
                      />
                      Not applicable
                    </label>
                  </div>
                  {errors.occupationalImpact && <span className="error-text">{errors.occupationalImpact}</span>}
                </div>
              </>
            )}

            {(formData.primaryReason === 'Weight loss/weight management' || formData.primaryReason === 'Both type 2 diabetes and weight management') && (
              <>
                <h3 className="section-title">Section 4B: Weight Management Pathway</h3>

                <div className="form-group">
                  <label className="form-label">
                    14. Which weight-related health conditions do you have? (Select all that apply)
                  </label>
                  <div className="checkbox-group-vertical">
                    {['Type 2 diabetes', 'High blood pressure (hypertension)', 'High cholesterol (dyslipidaemia)', 
                      'Heart disease or cardiovascular problems', 'Sleep apnoea', 'Prediabetes', 
                      'Fatty liver disease', 'Arthritis related to weight', 'None of the above'].map(condition => (
                      <label key={condition} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.weightConditions.includes(condition)}
                          onChange={() => toggleArrayField('weightConditions', condition)}
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    15. How many of the following conditions do you have? *
                    <span className="form-helper-text">
                      (Type 2 diabetes, hypertension, dyslipidaemia, cardiovascular disease, sleep apnoea)
                    </span>
                  </label>
                  <select 
                    className="form-select"
                    value={formData.conditionCount}
                    onChange={(e) => updateField('conditionCount', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="None">None</option>
                    <option value="1 condition">1 condition</option>
                    <option value="2 conditions">2 conditions</option>
                    <option value="3 conditions">3 conditions</option>
                    <option value="4 or more conditions">4 or more conditions</option>
                  </select>
                  {errors.conditionCount && <span className="error-text">{errors.conditionCount}</span>}
                </div>
              </>
            )}
          </>
        )}

        {/* Section 5: Medical History and Safety */}
        {currentSection === 5 && (
          <>
            <h3 className="section-title">Section 5: Medical History and Safety</h3>

            <div className="form-group">
              <label className="form-label">16. Do you have a history of any of the following? (Select all that apply)</label>
              <div className="checkbox-group-vertical">
                {['Pancreatitis', 'Diabetic eye disease (retinopathy)', 'Severe kidney disease', 
                  'Severe liver disease', 'Gastroparesis or severe digestive problems', 
                  'Gallbladder disease or gallstones', 'Eating disorder', 'None of the above'].map(condition => (
                  <label key={condition} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.medicalHistory.includes(condition)}
                      onChange={() => toggleArrayField('medicalHistory', condition)}
                    />
                    {condition}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">17. Are you currently taking any of the following medications?</label>
              <div className="checkbox-group-vertical">
                {['Insulin', 'Sulfonylureas', 'Other GLP-1 medications', 
                  'Oral contraceptives', 'None of the above'].map(medication => (
                  <label key={medication} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.currentMedications.includes(medication)}
                      onChange={() => toggleArrayField('currentMedications', medication)}
                    />
                    {medication}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">18. Have you had bariatric (weight loss) surgery? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bariatricSurgery"
                    value="Yes - less than 2 years ago"
                    checked={formData.bariatricSurgery === 'Yes - less than 2 years ago'}
                    onChange={(e) => updateField('bariatricSurgery', e.target.value)}
                  />
                  Yes - less than 2 years ago
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bariatricSurgery"
                    value="Yes - more than 2 years ago"
                    checked={formData.bariatricSurgery === 'Yes - more than 2 years ago'}
                    onChange={(e) => updateField('bariatricSurgery', e.target.value)}
                  />
                  Yes - more than 2 years ago
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bariatricSurgery"
                    value="No"
                    checked={formData.bariatricSurgery === 'No'}
                    onChange={(e) => updateField('bariatricSurgery', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="bariatricSurgery"
                    value="Scheduled for surgery"
                    checked={formData.bariatricSurgery === 'Scheduled for surgery'}
                    onChange={(e) => updateField('bariatricSurgery', e.target.value)}
                  />
                  Scheduled for surgery
                </label>
              </div>
              {errors.bariatricSurgery && <span className="error-text">{errors.bariatricSurgery}</span>}
            </div>
          </>
        )}

        {/* Section 6: Commitment to Treatment */}
        {currentSection === 6 && (
          <>
            <h3 className="section-title">Section 6: Commitment to Treatment</h3>

            <div className="form-group">
              <label className="form-label">
                19. Are you willing to participate in a wraparound care programme including: *
              </label>
              <ul className="commitment-list">
                <li>Regular appointments</li>
                <li>Dietary counselling</li>
                <li>Physical activity planning</li>
                <li>Lifestyle modification support</li>
              </ul>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wraparoundCare"
                    value="Yes, I understand and agree"
                    checked={formData.wraparoundCare === 'Yes, I understand and agree'}
                    onChange={(e) => updateField('wraparoundCare', e.target.value)}
                  />
                  Yes, I understand and agree
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wraparoundCare"
                    value="No"
                    checked={formData.wraparoundCare === 'No'}
                    onChange={(e) => updateField('wraparoundCare', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wraparoundCare"
                    value="I need more information"
                    checked={formData.wraparoundCare === 'I need more information'}
                    onChange={(e) => updateField('wraparoundCare', e.target.value)}
                  />
                  I need more information
                </label>
              </div>
              {errors.wraparoundCare && <span className="error-text">{errors.wraparoundCare}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">20. Are you able to self-inject medication weekly? *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="selfInject"
                    value="Yes"
                    checked={formData.selfInject === 'Yes'}
                    onChange={(e) => updateField('selfInject', e.target.value)}
                  />
                  Yes
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="selfInject"
                    value="Yes, with assistance"
                    checked={formData.selfInject === 'Yes, with assistance'}
                    onChange={(e) => updateField('selfInject', e.target.value)}
                  />
                  Yes, with assistance
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="selfInject"
                    value="No"
                    checked={formData.selfInject === 'No'}
                    onChange={(e) => updateField('selfInject', e.target.value)}
                  />
                  No
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="selfInject"
                    value="Not sure"
                    checked={formData.selfInject === 'Not sure'}
                    onChange={(e) => updateField('selfInject', e.target.value)}
                  />
                  Not sure
                </label>
              </div>
              {errors.selfInject && <span className="error-text">{errors.selfInject}</span>}
            </div>
          </>
        )}

        <button 
          type="button" 
          className="booking-button" 
          onClick={handleNext}
        >
          {currentSection < 6 ? 'CONTINUE' : 'SUBMIT ASSESSMENT'}
        </button>
      </form>
    </div>
  )
}