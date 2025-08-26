import React from "react";

const MapEmbed = ({
  coordinates = [23.588, 58.3829],
  location = "Oman",
  className = "",
  height = "400px",
}) => {
  const [lat, lng] = coordinates;

  // Use the provided Google Maps iframe with dynamic coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7606262.96021994!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3dd69f66a9d59bbf%3A0x3a064c7665b1a817!2s${encodeURIComponent(
    location
  )}!5e0!3m2!1sen!2seg!4v1756167786911!5m2!1sen!2seg`;

  return (
    <div className={`rounded-lg overflow-hidden shadow-sm border ${className}`}>
      <iframe
        title={`Location Map - ${location}`}
        src={mapUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
