'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useRef, useEffect } from 'react';
import styles from './JobFilters.module.css';
import { jobs } from '../data/jobs';

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [locationType, setLocationType] = useState(searchParams.get('locationType') || '');
  const [skill, setSkill] = useState(searchParams.get('skill') || '');

  // Custom Dropdown State
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const locationRef = useRef<HTMLDivElement>(null);

  // Extract unique locations from jobs data
  const allLocations = Array.from(new Set(jobs.map(job => job.location))).sort();
  // Separate 'Remote' from the rest
  const remoteLocation = allLocations.find(loc => loc.toLowerCase() === 'remote');
  const otherLocations = allLocations.filter(loc => loc.toLowerCase() !== 'remote');

  // Filter locations based on locationSearch
  const filteredOtherLocations = otherLocations.filter(loc => 
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [locationRef]);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    let params = new URLSearchParams(searchParams.toString());
    
    if (query) params.set('query', query);
    else params.delete('query');
    
    if (type) params.set('type', type);
    else params.delete('type');
    
    if (locationType) params.set('locationType', locationType);
    else params.delete('locationType');
    
    if (skill) params.set('skill', skill);
    else params.delete('skill');
    
    params.delete('page');
    router.push(`/jobs?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    setType('');
    setLocationType('');
    setSkill('');
    setLocationSearch('');
    router.push('/jobs');
  };

  const selectLocation = (loc: string) => {
    setLocationType(loc);
    setIsLocationOpen(false);
    setLocationSearch(''); // Reset search on select
  };

  return (
    <form className={styles.filtersContainer} onSubmit={handleApplyFilters}>
      <div className={styles.filterGroup}>
        <label htmlFor="query">Search Roles</label>
        <input
          id="query"
          type="text"
          placeholder="Job title or company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup} ref={locationRef}>
        <label>Location</label>
        <div className={styles.customDropdown}>
          <div 
            className={`${styles.dropdownTrigger} ${isLocationOpen ? styles.open : ''}`}
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <span>{locationType || 'Any Location'}</span>
            <span className={styles.dropdownArrow}>▼</span>
          </div>
          
          {isLocationOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSearchWrapper}>
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className={styles.dropdownSearch}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <ul className={styles.dropdownList}>
                <li 
                  className={`${styles.dropdownItem} ${!locationType ? styles.selected : ''}`}
                  onClick={() => selectLocation('')}
                >
                  Any Location
                </li>
                
                {remoteLocation && (!locationSearch || remoteLocation.toLowerCase().includes(locationSearch.toLowerCase())) && (
                  <li 
                    className={`${styles.dropdownItem} ${styles.remoteHighlight} ${locationType === remoteLocation ? styles.selected : ''}`}
                    onClick={() => selectLocation(remoteLocation)}
                  >
                    <span className={styles.remoteIcon}>🌍</span> {remoteLocation}
                  </li>
                )}

                {filteredOtherLocations.length > 0 && (
                  <div className={styles.dropdownDivider}></div>
                )}
                
                {filteredOtherLocations.map(loc => (
                  <li 
                    key={loc}
                    className={`${styles.dropdownItem} ${locationType === loc ? styles.selected : ''}`}
                    onClick={() => selectLocation(loc)}
                  >
                    {loc}
                  </li>
                ))}
                
                {filteredOtherLocations.length === 0 && (!remoteLocation || !remoteLocation.toLowerCase().includes(locationSearch.toLowerCase())) && (
                  <li className={styles.dropdownEmpty}>No locations found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="type">Job Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Any Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="skill">Skill / Tech Stack</label>
        <input
          id="skill"
          type="text"
          placeholder="e.g. React, Python"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterActions}>
        <button type="submit" className="btn-primary">
          Apply Filters
        </button>
        <button type="button" onClick={handleClear} className="btn-secondary">
          Clear All
        </button>
      </div>
    </form>
  );
}
