'use client'

import { useState, useEffect } from 'react'
import { bookingAPI, AvailabilitySlot, ServiceLocation, mapServiceToAPIService } from '@/lib/booking-api'

interface AvailabilitySelectorProps {
  service: string;
  treatment: string;
  onSlotSelect: (slot: AvailabilitySlot, location: ServiceLocation) => void;
  onPrevious: () => void;
  selectedDate?: string;
  selectedLocation?: ServiceLocation;
}

export default function AvailabilitySelector({ 
  service, 
  treatment, 
  onSlotSelect, 
  onPrevious,
  selectedDate,
  selectedLocation 
}: AvailabilitySelectorProps) {
  const [locations, setLocations] = useState<ServiceLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(selectedLocation?.id || '');
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDateLocal, setSelectedDateLocal] = useState(selectedDate || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (selectedLocationId && selectedDateLocal) {
      loadAvailability();
    }
  }, [selectedLocationId, selectedDateLocal]);

  const loadLocations = async () => {
    setLoading(true);
    
    // Check if this is a blood test service or free consultation
    const isBloodTest = service === 'blood-tests';
    const isFreeConsultation = service === 'free-consultation';
    
    if (!isBloodTest) {
      // For free consultations, use online/telephone location
      if (isFreeConsultation) {
        const onlineLocation: ServiceLocation = {
          id: 'wellness-online-consultation',
          name: 'Online/Telephone Consultation',
          address: 'Video call or phone consultation',
          city: 'Online',
          region: 'Online',
          postalCode: ''
        };
        
        setLocations([onlineLocation]);
        setSelectedLocationId(onlineLocation.id);
      } else {
        // For other non-blood test services, use fixed location
        const fixedLocation: ServiceLocation = {
          id: 'wellness-portman-square',
          name: 'The Wellness - Marylebone',
          address: '10 Portman Square',
          city: 'London',
          region: 'London',
          postalCode: 'W1H 6AZ'
        };
        
        setLocations([fixedLocation]);
        setSelectedLocationId(fixedLocation.id);
      }
      setLoading(false);
    } else {
      // For blood tests, only use Randox Health Great Portland Street
      const randoxGreatPortlandStreet: ServiceLocation = {
        id: 'randox-great-portland-street',
        name: 'Randox Health Great Portland Street',
        address: '10 New Cavendish Street',
        city: 'London',
        region: 'London',
        postalCode: 'W1G 9NF'
      };
      
      setLocations([randoxGreatPortlandStreet]);
      setSelectedLocationId(randoxGreatPortlandStreet.id);
      setLoading(false);
    }
  };

  const loadFallbackLocations = () => {
    // For blood tests, only show Randox Health Great Portland Street
    const mockLocations: ServiceLocation[] = [
      {
        id: 'randox-great-portland-street',
        name: 'Randox Health Great Portland Street',
        address: '10 New Cavendish Street',
        city: 'London',
        region: 'London',
        postalCode: 'W1G 9NF'
      }
    ];
    
    setLocations(mockLocations);
    setSelectedLocationId(mockLocations[0].id);
  };

  const loadAvailability = async () => {
    if (!selectedLocationId || !selectedDateLocal) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const isBloodTest = service === 'blood-tests';
      
      if (!isBloodTest) {
        // For non-blood test services, generate standard availability slots
        const standardSlots: AvailabilitySlot[] = [];
        const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
                      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
        
        times.forEach(time => {
          standardSlots.push({
            id: `slot-${selectedDateLocal}-${time}`,
            date: selectedDateLocal,
            time: time,
            available: true,
            duration: 30, // Default 30 minute slots
            serviceId: mapServiceToAPIService(service, treatment),
            locationId: selectedLocationId
          });
        });
        
        setAvailabilitySlots(standardSlots);
      } else {
        // For blood tests, temporarily use fallback data until API access is available
        // TODO: Uncomment when Randox API credentials are provided
        /*
        const serviceId = mapServiceToAPIService(service, treatment);
        const slots = await bookingAPI.getAvailability({
          serviceId,
          locationId: selectedLocationId,
          date: selectedDateLocal
        });
        
        setAvailabilitySlots(slots);
        */
        
        // Temporary: Use fallback slots for blood tests
        loadFallbackAvailability();
      }
    } catch (err) {
      console.error('Error loading availability:', err);
      
      // Always use fallback slots until API access is available
      console.log('Using fallback availability slots');
      loadFallbackAvailability();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackAvailability = () => {
    // Generate mock availability slots for the selected date
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00'
    ];
    
    const mockSlots: AvailabilitySlot[] = timeSlots.map((time) => ({
      id: `mock-slot-${selectedDateLocal}-${time}`,
      date: selectedDateLocal,
      time: time,
      duration: 30,
      available: Math.random() > 0.3, // 70% chance of being available
      serviceId: mapServiceToAPIService(service, treatment),
      locationId: selectedLocationId
    }));
    
    setAvailabilitySlots(mockSlots);
  };

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    const location = locations.find(loc => loc.id === selectedLocationId);
    if (location) {
      onSlotSelect(slot, location);
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(`2000-01-01T${timeString}`);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Get next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="availability-selector">
      <button 
        className="previous-button" 
        onClick={onPrevious}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Previous
      </button>

      <div className="booking-header">
        <h2 className="booking-title">Select Date & Location</h2>
        <p className="booking-subtitle">Choose your preferred appointment date, location, and time.</p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      )}

      {/* Location Selection */}
      <div className="form-group">
        <label className="form-label">Select Location *</label>
        <select 
          className="form-select" 
          value={selectedLocationId}
          onChange={(e) => setSelectedLocationId(e.target.value)}
          required
        >
          <option value="">Choose location...</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name} - {location.city === location.region ? location.city : `${location.city}, ${location.region}`}
            </option>
          ))}
        </select>
        {selectedLocationId && (
          <div className="location-details">
            {(() => {
              const loc = locations.find(l => l.id === selectedLocationId);
              return loc ? (
                <p className="form-helper-text">
                  📍 {loc.address}, {loc.city}, {loc.postalCode}
                </p>
              ) : null;
            })()}
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="form-group">
        <label className="form-label">Select Date *</label>
        <select 
          className="form-select" 
          value={selectedDateLocal}
          onChange={(e) => setSelectedDateLocal(e.target.value)}
          required
        >
          <option value="">Choose date...</option>
          {getAvailableDates().map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>
      </div>

      {/* Available Time Slots */}
      {selectedLocationId && selectedDateLocal && (
        <div className="time-slots-section">
          <h3 className="section-title">Available Times</h3>
          
          {loading ? (
            <div className="loading-slots">
              <div className="loading-spinner"></div>
              <p>Loading available times...</p>
            </div>
          ) : availabilitySlots.length > 0 ? (
            <div className="time-slots-grid">
              {availabilitySlots
                .filter(slot => slot.available)
                .map((slot) => (
                  <button
                    key={slot.id}
                    className="time-slot"
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <span className="slot-time">{formatTime(slot.time)}</span>
                    <span className="slot-duration">{slot.duration} min</span>
                  </button>
                ))}
            </div>
          ) : (
            <div className="no-slots">
              <p>No available times for the selected date and location.</p>
              <p>Please try a different date or location.</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .availability-selector {
          padding: 1rem;
        }

        .previous-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #6b7280;
          font-size: 0.875rem;
          cursor: pointer;
          margin-bottom: 1.5rem;
          padding: 0.5rem 0;
        }

        .previous-button:hover {
          color: #374151;
        }

        .previous-button svg {
          width: 16px;
          height: 16px;
        }

        .booking-header {
          margin-bottom: 2rem;
        }

        .booking-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .booking-subtitle {
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .error-message button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-top: 0.5rem;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
        }

        .form-select:focus {
          outline: none;
          border-color: #9c27b0;
          box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
        }

        .location-details {
          margin-top: 0.5rem;
        }

        .form-helper-text {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .time-slots-section {
          margin-top: 2rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 1rem 0;
        }

        .loading-slots {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          gap: 1rem;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #9c27b0;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
        }

        .time-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .time-slot:hover {
          border-color: #9c27b0;
          background: #faf5ff;
        }

        .slot-time {
          font-weight: 600;
          color: #111827;
          font-size: 0.875rem;
        }

        .slot-duration {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .no-slots {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
        }

        .no-slots p {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}