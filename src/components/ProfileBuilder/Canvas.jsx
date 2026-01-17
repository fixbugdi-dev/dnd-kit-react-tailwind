import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Plus } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Canvas({ items, renderComponent, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 lg:ml-80 min-h-screen bg-gray-50 flex justify-center transition-all duration-300">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile Layout</h1>
                <p className="text-gray-500 mt-2">Customize how visitors see your store.</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-200 whitespace-nowrap">
               {items.length} {items.length === 1 ? 'Section' : 'Sections'}
            </div>
        </div>

        <div
          ref={setNodeRef}
          className={`
            min-h-[500px] md:min-h-[600px] border-2 border-dashed rounded-xl transition-all duration-300 relative
            ${isOver 
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01] shadow-xl ring-4 ring-indigo-100' 
                : 'border-gray-300 bg-white shadow-sm'
            }
          `}
        >
          {items.length === 0 ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-indigo-300 group-hover:text-indigo-500 transition-colors">
                    <Plus size={32} strokeWidth={3} />
                </div>
                <p className="text-lg font-medium text-gray-600">Your canvas is empty</p>
                <p className="text-sm mt-2 max-w-xs text-gray-400">
                    Open the sidebar and drag components here to start building.
                </p>
             </div>
          ) : (
            <div className="p-4 md:p-8 pb-32">
                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <SortableItem 
                        key={item.id} 
                        id={item.id}
                        component={renderComponent(item)}
                        onDelete={onDelete}
                    />
                ))}
                </SortableContext>
                
                {/* Visual cue for the end of the list */}
                {isOver && (
                    <div className="h-2 bg-indigo-500 rounded-full mx-auto w-1/2 mt-4 opacity-20 animate-pulse"></div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Canvas.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  renderComponent: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
