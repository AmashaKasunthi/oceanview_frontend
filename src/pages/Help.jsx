export default function Help(){
  return(
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <p>Welcome to Ocean View Resort Reservation System.</p>
      <ul className="list-disc ml-6 mt-4">
        <li>Login as Admin</li>
        <li>Add or manage room reservations</li>
        <li>Generate PDF bills</li>
        <li>View reports</li>
        <li>Cancel or update bookings</li>
      </ul>
      <p className="mt-4">For help contact: oceanview@hotel.com</p>
    </div>
  );
}
