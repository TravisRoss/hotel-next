import { TrashIcon } from '@heroicons/react/24/solid';
import { revalidatePath } from 'next/cache';
import { supabase } from '../_lib/supabase-client';
import { auth } from '@/app/_lib/auth';
import { getBookings } from '../_lib/data-service';

function DeleteReservation({ bookingId }) {
  return (
    <button onClick={() => deleteReservationAction(bookingId)} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      <span className='mt-1'>Delete</span>
    </button>
  );
}

export async function deleteReservationAction({ bookingId }) {
  const session = await auth();
  if(!session) {
    throw new Error('Not authenticated');
  }

  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map(booking => booking.id);
  if(!bookingIds.includes(bookingId)) {
    throw new Error("You don't have permission to delete this booking");
  }

  const {error} = await supabase.from('bookings')
    .delete()
    .eq('id', bookingId)

  if (error) {
    throw new Error("failed to delete booking");
  }

  revalidatePath('/account/reservations');
}

export default DeleteReservation;
