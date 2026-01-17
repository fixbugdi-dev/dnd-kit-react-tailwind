import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

export function SortableItem({ id, component, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative mb-4 group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10" {...listeners} {...attributes}>
         <GripVertical size={20} className="text-gray-400" />
      </div>
      
      <div className="pl-6 relative">
          {component}
          
          <button 
            onClick={() => onDelete(id)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded"
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
      </div>
    </div>
  );
}

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
};
