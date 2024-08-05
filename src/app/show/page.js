"use client"

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import fetchBackend from "@/utils/commonFetch";


// export default function ShowItems() {
function ShowItems() {
  const [nodes, setNodes] = useState([]);


  useEffect(() => {
    async function init() {
      const result = await fetchBackend("/graph/", "GET");
      setNodes(result);
    }
    init();
  }, [])

  return (
    <Box>
      <Box>
        Hey :D
      </Box>
      <ul>
        {
          nodes.map(item => (
            <li>{item.properties.name} {item.properties.code}</li>
          ))
        }
      </ul>
    </Box>
  )
}


// Componente para renderizar un nodo del árbol
const TreeNode = ({ node, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      const fetchChildren = async () => {
        setLoading(true);
        try {
          const response = [{ properties: { code: "test", name: "Aqui estoy" } }]
          setChildren(response);
        } catch (error) {
          console.error('Error fetching children:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchChildren();
    }
  }, [isExpanded, node.properties.code]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle(node.properties.code);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {node.properties.name} {node.properties.code} {children.length > 0 && (isExpanded ? '[-]' : '[+]')}
      </div>
      {isExpanded && (
        <div>
          {loading ? <p>Cargando...</p> : (
            <div>
              {children.map(child => (
                <TreeNode
                  key={child.id}
                  node={child}
                  onToggle={onToggle}
                  // expandedNodes={expandedNodes}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente principal
const TreeView = () => {
  const [rootNodes, setRootNodes] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  useEffect(() => {
    const fetchRootNodes = async () => {
      try {
        const result = await fetchBackend("/graph/", "GET");
        setRootNodes(result);
      } catch (error) {
        console.error('Error fetching root nodes:', error);
      }
    };

    fetchRootNodes();
  }, []);

  const handleToggle = (nodeId) => {
    setExpandedNodes(prev => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId);
      } else {
        newExpandedNodes.add(nodeId);
      }
      return newExpandedNodes;
    });
  };

  return (
    <div>
      <h1>Árbol de Datos</h1>
      <div>
        {rootNodes.map(node => (
          <TreeNode
            key={node.properties.code}
            node={node}
            onToggle={handleToggle}
            expandedNodes={expandedNodes}
          />
        ))}
      </div>
    </div>
  );
};
export default TreeView;